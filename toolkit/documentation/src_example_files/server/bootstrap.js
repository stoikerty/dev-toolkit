import express from 'express';
import hbs from 'express-handlebars';
import serveStatic from 'serve-static';

import router from './router';

class App{
  constructor(){
    // server config
    this.hostname = 'localhost';
    this.port = 2000;
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
    /*eslint-disable no-console */
    this.log = function() {
      return console.log.bind(console);
    }();
    /*eslint-enable no-console */
  }

  init(){
    // -> Set the folder for html views & disable powered-by header
    this.express.engine('html', hbs({ extname: 'html' }));
    this.express.set('views', process.cwd() + '/src/server/views');
    this.express.set('view engine', 'html');
    this.express.locals.settings['x-powered-by'] = false;
    this.express.disable('x-powered-by');
  }

  // Launch express server with react-router
  start(options={ message: null }){
    // serve build folder
    this.express.use(serveStatic('build'));

    // Listen on specified port
    this.express.listen(this.port, function(error) {
      if (error) {
        app.error(error);
      } else {
        app.log('==> 🌎 Listening on http://' + this.hostname + ':%s/', this.port);
        if (options.message){
          app.log(options.message);
        }
      }
    });

    // start react-router
    this.express.use(router);
  }

  // bind express middleware
  use(...middlewareOptions){
    this.express.use(...middlewareOptions);
  }
}

// Create Node Global
GLOBAL.app = new App;
