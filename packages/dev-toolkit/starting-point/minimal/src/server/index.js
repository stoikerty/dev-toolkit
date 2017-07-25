import express from 'express';
import hbs from 'express-handlebars';
import path from 'path';

// Unlike the client app, the server app can only ever be run on the server,
// we therefore have direct access to Node-specific things like `process`
const serverPort = process.env.SERVER_PORT || 2000;
const rootDirectory = process.cwd();
const buildDir = path.join(rootDirectory, 'build');
const serverViews = `${rootDirectory}/src/server/views`;

export default new class {
  constructor() {
    this.express = express();
  }

  // Ability to launch server later (allows webpack to bind middleware before start)
  start() {
    // We're using handlebars as the renderer for the layout.hbs-file in `src/server/views`
    this.express.engine('hbs', hbs({ extname: 'hbs' }));
    this.express.set('views', serverViews);
    this.express.set('view engine', 'hbs');
    this.express.locals.settings['x-powered-by'] = false;
    this.express.disable('x-powered-by');

    // We tell express that it should serve all files statically
    this.express.use(express.static(buildDir));

    // A simple health-check endpoint to see if the server is alive
    this.express.get('/health', (req, res) => {
      res.send('OK');
    });

    // Run the express server by listening to our specified port
    this.serverInstance = this.express.listen(serverPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on port ${serverPort}`);
    });
  }

  // A way to stop and shut-down the server, in case you need it for things like tests
  stop() {
    this.serverInstance.close();
  }

  // Bind the express middleware so webpack can use it to attach the dev-server middleware,
  // this method should redirect to & act in the same way as the express `use`-method.
  use(...middlewareOptions) {
    this.express.use(...middlewareOptions);
  }
}();
