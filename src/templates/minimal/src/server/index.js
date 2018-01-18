import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { isDev } from 'dev-toolkit/settings';

const createHTML = ({ html, script }) => `<!DOCTYPE html>
<html>
  <head><title>App</title></head>
  <body>
    <div data-jshook="app-body">${html}</div>
    <script src="${script}"></script>
  </body>
</html>`;

export default new class {
  constructor() {
    // Let dev-toolkit know about express by setting `this.express`,
    // this allows dev-toolkit to attach the dev-server middleware to webpack
    this.express = express();
  }

  // Ability to launch server later (allows dev-toolkit to bind webpack-middleware before start)
  start({ assets, buildFolder }) {
    if (isDev) {
      // Render template with no prerendered html in development mode
      this.express.use((req, res) =>
        res.status(200).send(createHTML({ script: assets.app.js, html: '' }))
      );
    } else {
      // Make assets in build folder available to the client.
      this.express.use(express.static(buildFolder));
    }

    // Run the express server by listening on the specified port
    this.serverInstance = this.express.listen(3000);
  }

  // Rendering of the html on build happens through this preRender-method
  preRender({ assets, buildFolder }) {
    // return a Promise to dev-toolkit
    return new Promise((resolve, reject) => {
      // Load Client App via RootComponent
      import('src/client/RootComponent').then(module => {
        const RootComponent = module.default;

        // Generated html is written to html file in build folder
        fs.writeFile(
          path.join(buildFolder, 'index.html'),
          createHTML({
            script: assets.app.js,
            html: renderToString(<RootComponent />),
          }),
          error => (error ? reject(error) : resolve())
        );
      });
    });
  }
}();
