# dev-toolkit Templates
```bash
# You can specify the template with the `--template` parameter
dev-toolkit init my_project --template [template-name]
```
After initialising a project with the `init` command you will get a small structured boilerplate to work with. `dev-toolkit` abstracts away the base universal & webpack configurations and some templates will show how to extend each one.

## Shared Structure between most templates
There are a number of things that will be common amongst most templates. This base boilerplate represents a starting point for your app and although it's suggested that you stick with that structure you're not restricted to do so if you decide to use the `dev-toolkit` programmatic interface.

### `build/`
```bash
# The directory is generated when the `build` command is run
dev-toolkit build
```
The `build/` directory will contain the static files that are generated with webpack such as your assets and the manifest file. If you make use of the pre-render functionality of `dev-toolkit` you might also have one or more `index.html`-files. If you have extended webpack, it's likely you'll also have other assets in here.

### `src/`
This folder contains your application source code and is split into 2 parts, a **`client/`** directory and a **`server/`** directory. Each directory has an `index.js` entry point which dev-toolkit expects. The `views/` directories, the use of the templating engine `handlebars` and other dependencies are pre-defined but not mandatory, the only thing `dev-toolkit` needs to know about is `express`.

When run using the command-line interface, `dev-toolkit` has a small amount of dependencies. These 2 files need to exist for your project to work.

#### • `src/client/index.js` - client entry point
This file is only run on the client. Webpack uses it as the entry point to generate a client-bundle. Although this file could technically only contain a single `console.log` and work just fine, it is recommended to use the following structure to benefit from webpack's hot-reloading feature:
```js
const hotReRender = () => {
  // Dynamically require module inline for hot-reloading
  import('./RootComponent').then(module => {
    // Call `ReactDOM.hydrate`...
  });
};

// Start the app by rendering it for the first time
hotReRender();

// Support hot-reloading of components by rerendering using webpack's included HMR (Hot-Module-Replacement)
if (module.hot) {
  // After accepting the new module from webpack, we rerender on the next tick
  module.hot.accept('./RootComponent', () => setTimeout(hotReRender));
}
```

#### • `src/server/index.js` - server entry point
`dev-toolkit` uses this file as the entry point to start up the server and to pre-render. In order to do this, it expects a class like so:
```js
// Provide a class to dev-toolkit which is executed immediately once imported (using the brackets at the end of the export)
export default new class {
  constructor() {
    // Let dev-toolkit know about express by setting `this.express`
    // Without this bind, dev-toolkit can't attach the dev-server middleware to webpack
    this.express = express();
  }

  // The start method allows `dev-toolkit` to start the server at the right time (after the hot-reload middleware is attached)
  start({ assets, buildFolder }) {
    // Start up the server...
    // this.express.listen(serverPort, () => ...
  }

  // Rendering of the html on build happens through this preRender-method.
  // This method is only called when using `dev-toolkit build`
  preRender({ assets, buildFolder }) {
    // return a Promise to dev-toolkit
    return new Promise((resolve, reject) => {
      // Later call `resolve()` and `reject`
    });
  }
}();
```

### `.gitignore`
### `.babelrc`
### `.prettierrc`
### `dev-toolkit.config.js`
### `package.json`

## Available Templates

### minimal (default)
Stripped out example with pre-render

### standard (suggested)
If you want to start a project from scratch, this is your best starting point.
This template contains no routing, it will give you out of the box:
- simple client app with
  - hot-reload for development
  - 1 view called `App.js`
- simple server app for
  - rendering the layout on request
  - pre-rendering the layout to an html file
- `settings.js`-file to be shared between client & server with
  - example usage of `sharedEnvs` via `dev-toolit/settings`
- `dev-toolkit.config.js`-file which contains
  - usePreRender set to `false` (default)
  - example usage with `MY_CUSTOM_ENV` environment variable
- `handler.js`-file serverless-type mini-example which contains
  - example usage of `dev-toolkit` programmatic API usage

---

## WIP Templates

### with-sass
Example using sass/scss with custom webpack configuration and node-hooks

### serverless
Example using dev-toolkit programmatically for usage with cloud-functions/lambdas in a serverless scenario.

---

## Planned Templates

### with-react-router
### with-redux
### with-mocha
### with-jest
### with-glamorous
### with-dynamic-routes
### with-styled-components

### as exported npm-package?
