import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';

import { PATHS } from './_userSettings';

class ServeStatic {
  constructor() {
    // server config
    this.hostname = process.env.HOST || 'localhost';
    this.port = process.env.PORT || 4000;
    this.publicDirectory = PATHS.buildFolder;

    // bind class methods
    this.start = this.start.bind(this);

    // Create express server instance & initialize
    this.express = express();
    this.start();
  }

  start() {
    this.express.get('/', (req, res) => {
      res.sendFile(path.join(this.publicDirectory, '/index.html'));
    });

    this.express.use(compression());
    this.express.use(methodOverride());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(this.publicDirectory));
    this.express.use(errorHandler({ dumpExceptions: true, showStack: true }));

    console.log(`\n==> 🌎  Listening on http://${this.hostname}:${this.port}\n`);

    this.express.listen(this.port, this.hostname);
  }
}

export default new ServeStatic();
