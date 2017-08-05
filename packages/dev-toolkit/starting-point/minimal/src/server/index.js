import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';
import fs from 'fs';

// Unlike the client app, the server app can only ever be run on the server,
// we therefore have direct access to Node-specific things like `process`
const serverPort = process.env.SERVER_PORT || 2000;
const rootDirectory = process.cwd();
const buildDir = path.join(rootDirectory, 'build');
const serverViews = `${rootDirectory}/src/server/views`;

export default new class {
  constructor() {
    this.express = express();

    // Handlebars is used for server-rendering the html template in `src/server/views`
    this.handlebarsInstance = expressHandlebars.create();
    // We also use it in express
    this.express.engine('hbs', this.handlebarsInstance.engine);
    this.express.set('views', serverViews).set('view engine', 'hbs');

    // Prevent express from sending powered-by header
    this.express.disable('x-powered-by');
  }

  // Ability to launch server later (allows webpack to bind middleware before start)
  start({ assets }) {
    // We tell express to serve all files statically
    this.express.use(express.static(buildDir));

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
  render({ assets, buildFolder }) {
    return new Promise((resolve, reject) => {
      // Here handlebars is used to generate the html, but you can use any other method
      this.handlebarsInstance
        .render(path.join(serverViews, 'layout.hbs'), { assets })
        .then((html) => {
          this.writeHtml({ html, buildFolder, resolve, reject });
        });
    });
  }

  // Generated html is written to html file in build folder
  writeHtml({ html, buildFolder, resolve, reject }){
    fs.writeFile(
      path.join(buildFolder, 'index.html'),
      html,
      error => error ? reject(error) : resolve()
    );
  }

  // Bind the express middleware so webpack can use it to attach the dev-server middleware,
  // this method should redirect to & act in the same way as the express `use`-method.
  use(...middlewareOptions) {
    this.express.use(...middlewareOptions);
  }
}();
