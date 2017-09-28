import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import decache from 'decache';
import { isDev, isProd, usePreRender } from 'dev-toolkit/settings';

// Unlike the client app, the server app can only ever be run in Node.js
// we therefore have direct access to Node-specific things like `process`
const serverPort = process.env.SERVER_PORT || 3000;
const projectDirectory = process.cwd();
const serverViews = path.resolve(projectDirectory, 'src/server/views');
const rootComponentPath = path.resolve(projectDirectory, 'src/client/RootComponent');

export default new class {
  constructor() {
    // Let dev-toolkit know about express by setting `this.express`,
    // this allows dev-toolkit to attach the dev-server middleware to webpack
    this.express = express();

    // Handlebars is used for server-rendering the html template in `src/server/views`
    this.handlebarsInstance = expressHandlebars.create();

    // Use Handlebars as the view engine in express
    this.express.engine('hbs', this.handlebarsInstance.engine);
    this.express.set('views', serverViews).set('view engine', 'hbs');

    // Prevent express from sending powered-by header
    this.express.disable('x-powered-by');
  }

  // Ability to launch server later (allows dev-toolkit to bind webpack-middleware before start)
  start({ assets, buildFolder }) {
    // Provide a simple health-check endpoint to see if the server is alive
    this.express.get('/health', (req, res) => {
      res.send('OK');
    });

    // Make assets in build folder available to the client.
    // In development, the `webpack-dev-middleware` used by dev-toolkit takes care of this.
    if (!isDev) {
      this.express.use(express.static(buildFolder));
    }

    // By default, dev-toolkit serves the build folder with pre-rendered files.
    if (isDev || (isProd && !usePreRender)) {
      // Render the template-file on any incoming requests
      this.express.use((req, res) => {
        // Remove Client App from cache (cheap server-side Hot-Reload)
        if (isDev) {
          decache(rootComponentPath);
        }
        // Load newest version of Client App via RootComponent
        import(rootComponentPath).then((module) => {
          const RootComponent = module.default;
          res.status(200).render(
            'template',
            { assets, renderedHtml: renderToString(<RootComponent />)
          });
        });
      });
    }

    // Run the express server by listening on the specified port
    this.serverInstance = this.express.listen(serverPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on port ${serverPort}`);
    });
  }

  // A way to stop and shut-down the server, you might need this for things like e2e-tests
  stop() {
    this.serverInstance.close();
  }

  // Rendering of the html on build happens through this preRender-method
  preRender({ assets, buildFolder }) {
    // Load Client App via RootComponent
    const RootComponent = require(rootComponentPath).default;
    return new Promise((resolve, reject) => {
      // Here handlebars is used to generate the html without express and without webpack
      this.handlebarsInstance
        .render(
          path.join(serverViews, 'template.hbs'),
          { assets, renderedHtml: renderToString(<RootComponent />) }
        )
        .then((html) => {
          // Generated html is written to html file in build folder
          fs.writeFile(
            path.join(buildFolder, 'index.html'),
            html,
            error => (error ? reject(error) : resolve()),
          );
        });
    });
  }
}();
