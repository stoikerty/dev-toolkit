import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import fs from 'fs';

import { isClient } from 'src/settings';

// Unlike the client app, the server app can only ever be run in Node.js
// we therefore have direct access to Node-specific things like `process`
const serverPort = process.env.SERVER_PORT || 2000;
const projectDirectory = process.cwd();
const serverViews = `${projectDirectory}/src/server/views`;

export default new class {
  constructor() {
    // Let dev-toolkit know about express by setting `this.express`,
    // this allows dev-toolkit to attach the dev-server middleware to webpack
    this.express = express();

    console.log(`rendering on ${isClient ? 'Client' : 'Server'}`);

    // Handlebars is used for server-rendering the html template in `src/server/views`
    this.handlebarsInstance = expressHandlebars.create();

    // Use Handlebars as the view engine in express
    this.express.engine('hbs', this.handlebarsInstance.engine);
    this.express.set('views', serverViews).set('view engine', 'hbs');

    // Prevent express from sending powered-by header
    this.express.disable('x-powered-by');
  }

  // Ability to launch server later (allows dev-toolkit to bind webpack-middleware before start)
  start({ assets }) {
    // Render the layout-file on any incoming requests
    this.express.use((req, res) => {
      res.status(200).render('layout', { assets });
    });

    // Provide a simple health-check endpoint to see if the server is alive
    this.express.get('/health', (req, res) => {
      res.send('OK');
    });

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

  // Rendering of the html on build happens through this render-method
  preRender({ assets, buildFolder }) {
    return new Promise((resolve, reject) => {
      // Here handlebars is used to generate the html without express
      this.handlebarsInstance
        .render(path.join(serverViews, 'layout.hbs'), { assets })
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
