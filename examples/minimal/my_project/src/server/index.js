import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import decache from 'decache';
import { isDev, isProd, usePreRender } from 'dev-toolkit/settings';

const serverPort = process.env.SERVER_PORT || 3000;
const projectDirectory = process.cwd();
const serverViews = path.resolve(projectDirectory, 'src/server/views');
const rootComponentPath = path.resolve(projectDirectory, 'src/client/RootComponent');

export default new class {
  constructor() {
    this.express = express();

    this.handlebarsInstance = expressHandlebars.create();

    this.express.engine('hbs', this.handlebarsInstance.engine);
    this.express.set('views', serverViews).set('view engine', 'hbs');

    this.express.disable('x-powered-by');
  }

  start({ assets, buildFolder }) {
    this.express.get('/health', (req, res) => {
      res.send('OK');
    });

    if (!isDev) {
      this.express.use(express.static(buildFolder));
    }

    if (isDev || (isProd && !usePreRender)) {
      this.express.use((req, res) => {
        if (isDev) {
          decache(rootComponentPath);
        }
        import(rootComponentPath).then((module) => {
          const RootComponent = module.default;
          res.status(200).render(
            'template',
            { assets, renderedHtml: renderToString(<RootComponent />)
          });
        });
      });
    }

    this.serverInstance = this.express.listen(serverPort, () => {
      console.log(`Server is listening on port ${serverPort}`);
    });
  }

  stop() {
    this.serverInstance.close();
  }

  preRender({ assets, buildFolder }) {
    const RootComponent = require(rootComponentPath).default;
    return new Promise((resolve, reject) => {
      this.handlebarsInstance
        .render(
          path.join(serverViews, 'template.hbs'),
          { assets, renderedHtml: renderToString(<RootComponent />) }
        )
        .then((html) => {
          fs.writeFile(
            path.join(buildFolder, 'index.html'),
            html,
            error => (error ? reject(error) : resolve()),
          );
        });
    });
  }
}();
