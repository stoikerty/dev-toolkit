# dev-toolkit Templates
```bash
# You can specify the template with the `--template` parameter
dev-toolkit init my_project --template [template-name]
```
After initialising a project with the `init` command you will get a small structured boilerplate to work with. `dev-toolkit` abstracts away the base universal & webpack configurations. Some templates show how to extend each one.

#### Quick-links to available templates
- [minimal](#minimal)
- [standard (default)](#standard-default)
- [with-sass](#with-sass)
- [with-eslint](#with-eslint)

---

## Shared Structure between most templates
There are a number of things that will be common amongst most templates. This base boilerplate represents a starting point for your app and although it's suggested that you stick with that structure, you're not restricted to do so. You also have the ability to completely forego the structure if you make use of the `dev-toolkit` programmatic interface.

### `build/`
```bash
# The directory is generated when the `build` command is run
dev-toolkit build
```
The `build/` directory will contain the static files that are generated with webpack such as your assets and the manifest file. If you make use of the pre-render functionality of `dev-toolkit` you might also have one or more `index.html`-files.

If you have extended webpack, it's likely you'll have other assets in here as well. The `manifest.json`-file will contain references to all assets which are processed by webpack.

### `src/`
This folder contains your application source code and is split into 2 parts, a **`client/`** directory and a **`server/`** directory. Each directory has an `index.js` entry point which dev-toolkit expects. The `views/`-directories, the use of the templating engine `handlebars` and other dependencies that are pre-defined are not mandatory, the only package-dependency `dev-toolkit` needs to know about is `express`.

When run using the command-line interface, `dev-toolkit` expects 2 `index.js`-files to exist. The `RootComponent.js` file is not necessary for `dev-toolkit` to work but it is useful for getting server-rendering working properly.

#### • `src/client/index.js` - client entry point
*This file is only run on the client.* Webpack uses the file as the entry point to generate a client-bundle. Although this file could technically only contain a single `console.log` and work just fine, it is recommended to use the following structure to benefit from webpack's hot-reloading feature:

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

#### • `src/client/RootComponent.js` - shared entry point
*This file is universal. It's imported from both, the client and the server.* Any code used within this file and any code imported into this file needs to be compatible with Node.js as well as the browser. To facilitate knowing which environment you are in, you can use the following:

```js
// Get the current environment from exposed settings
import { isClient, isServer } from 'dev-toolkit/settings';

if (isClient) {
  // Code inside this if-block is only run on the client
  // Using `typeof window !== 'undefined'` has a similar effect to `isClient` but
  // `isClient` doesn't rely on the `window`-object, it uses webpack for this check
}

if (isServer) {
  // Code inside this if-block is only run on the server
  // `if (!isClient)` would also work, both variables are equivalent to each other
}
```

#### • `src/server/index.js` - server entry point
`dev-toolkit` uses this file as the entry point to start up the server and to pre-render. In order to do this, it expects a self-executing javascript class which is structure like this:

```js
// Provide a class to dev-toolkit which is executed immediately once imported
// (immediate execution is done using the brackets at the end of the export)
export default new class {
  constructor() {
    // Let dev-toolkit know about express by setting `this.express`
    // Without this binding, dev-toolkit wouldn't be able to attach the
    // dev-server middleware and hot-reload middleware to webpack
    this.express = express();
  }

  // The start method allows `dev-toolkit` to start the server at the right time
  // (after the both middlewares have been attached to express)
  start({ assets, buildFolder }) {
    // Start up the server...
    // this.express.listen(serverPort, () => ...
  }

  // Rendering of the html on build happens through this preRender-method.
  // It's not tied to webpack at all so that you have full control over your
  // templating solution. This method is only called when using `dev-toolkit build`
  preRender({ assets, buildFolder }) {
    // return a Promise to dev-toolkit so it knows when the task is finished
    return new Promise((resolve, reject) => {
      // You must later call `resolve()` and `reject()`
    });
  }
}();
```

### `.babelrc`
This file contains the babel-configuration. It's likely to only contain the `dev-toolkit` babel preset which allows you to use modern syntax features.

### `.prettierrc`
Every project has Prettier by default, feel free to use your preferred settings. Thanks to the way Prettier works, to have the files conform to your new settings, just run `prettier --write './**/*.js'` or  and you're good to go.

### `dev-toolkit.config.js`
If you are looking where to place your webpack loaders and plugins, check this file out. This is your entry point for customising `dev-toolkit` itself and webpack.

### `package.json`
Your standard `package.json`. It contains a few npm commands that make calls to the dev-toolkit CLI with the right environment variables.

---

## Available Templates

### minimal
```bash
dev-toolkit init my_project --template minimal [--skip-comments]
```
This template uses `dev-toolkit` at its most minimal level. In contrast to the other templates it does not include some defaults such as `dev-toolkit.config.js` or Prettier. The template is for all you minimalists out there that like to figure things out from scratch.

It contains only 3 files *(plus a `package.json` and a `.babelrc`)*
- `src/client/index.js`
- `src/client/RootComponent.js`
- `src/server/index.js`

### standard (default)
```bash
dev-toolkit init my_project [--skip-comments]
```
If you want to start a project from scratch, this is your best starting point.
This template contains no routing or css, it will give you out of the box:
- simple client app with
  - hot-reload for development
  - 1 view called `App.js`
- simple server app for
  - rendering the layout on request
  - pre-rendering the layout to an html file
  - using `clear-module` for server-side hot-reload
- `settings.js`-file to be shared between client & server with
  - example usage of `sharedEnvs` via `dev-toolit/settings`
- `dev-toolkit.config.js`-file which contains
  - `usePreRender` set to `false` (default)
  - example usage with `MY_CUSTOM_ENV` environment variable

### with-sass
Example using sass/scss with custom webpack configuration and node-hooks.

### with-eslint
Example using eslint-configuration.

---

## Possible future Templates

Here are some of the templates that could be added if enough requests (or contributions) come in.

- serverless
- with-react-router
- with-redux
- with-mocha
- with-jest
- with-glamorous
- with-typescript
- with-dynamic-routes
- with-styled-components
- as exported npm-package?
