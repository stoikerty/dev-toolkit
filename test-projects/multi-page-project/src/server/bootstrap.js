import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import hbs from 'express-handlebars';
import router from './router';

export default new class App {
  constructor() {
    // server config
    this.hostname = process.env.HOST || 'localhost';
    this.port = process.env.PORT || 2000;

    // bind class methods
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.use = this.use.bind(this);

    // Create express server instance & initialize
    this.express = express();
    this.init();

    // Create application logging functionality.
    // A neat console wrapper that keeps the correct line number.
    // http://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
    /* eslint-disable no-console */
    this.log = (function log() {
      return console.log.bind(console);
    }());
    /* eslint-enable no-console */
  }

  init() {
    this.express.engine('hbs', hbs({ extname: 'hbs' }));
    this.express.set('views', `${process.cwd()}/src/server/views`);
    this.express.set('view engine', 'hbs');
    this.express.locals.settings['x-powered-by'] = false;
    this.express.disable('x-powered-by');
  }

  // Launch express server with react-router
  start(options = { message: null, serveBuild: false }) {
    // use gzip compression
    this.express.use(compression());

    if (options.serveBuild) {
      // serve build folder
      this.express.use(serveStatic('build'));
    }

    // Listen on specified port
    this.express.listen(this.port, (error) => {
      if (error) {
        this.express.error(error);
      } else {
        this.log(`\n==> 🌎  Listening on http://${this.hostname}:${this.port}\n`);
        if (options.message) {
          this.log(options.message);
        }
      }
    });

    // start react-router
    this.express.use(router);
  }

  // bind express middleware
  use(...middlewareOptions) {
    this.express.use(...middlewareOptions);
  }
};
