<p align="center">
  <img src="/packages/dev-toolkit/dev-toolkit-logo.png" alt="universal-dev-toolkit-logo" height='42'>
</p>
<p align="center">
  Jump-start your <code>react</code>-powered Web App.<br/>
  <a href="#generate-a-static-build-with-dynamic-pages"><code>dynamic pages</code></a>
  &nbsp;&nbsp;<a href="#powerful-css-tools"><code>sass &amp; css-modules</code></a>
  &nbsp;&nbsp;<a href="#use-server-with-server-side-rendering"><code>server-rendering</code></a>
  &nbsp;&nbsp;<a href="#developer-convenience"><code>hot-reload</code></a>
</p>

## Create a new project
```bash
# install & initialize new app
npm install -g dev-toolkit
dev-toolkit --init my_app
cd my_app
```
```
# run it via npm scripts
npm run dev
# or run it directly (-w or --watch)
dev-toolkit --watch
```

This will give you the following structure to work with:
```
src
├── client
│   ├── app.js
│   └── ...
└── server
    └── ...
```

## Generate a static build
```bash
# Create `build`-folder with compiled files (-b or --build)
dev-toolkit --build
```
- removes previous `build`-folder
- automatically uses production-builds of React and Redux
- allows for a [custom vendor-bundle](#define-what-modules-are-bundled-into-vendorjs)
- extracts css from individual modules
- hashes assets, including `jpg`, `png`, `gif` & `svg`-files

### Verify build
Verify if static build is working correctly.
```bash
# Runs a minimal server that serves the build folder (--static or --serve-static)
dev-toolkit --serve-static
```

### Generate a static build with dynamic pages

To make use of dynamic pages and components for making your app load faster use the extended build command.

**For advanced users only**, [refer to this gist](https://gist.github.com/stoikerty/40a668e8fd4e2919034fd1eed2252bcb) for information on how to implement it.
```bash
# This will create an index-file for each dynamic route (-d --dynamic or --build --dynamic)
dev-toolkit --build --dynamic
```
- html is pre-rendered and inserted into the body
- creates multiple js-bundles, one for each dynamic page
- each `index.html` contains a `script`-link to the `app` bundle and the page-bundle
- scripts use `async` and `defer`-attributes as appropriate
- each subsequent page can be pre-cached and loaded on demand

## Setting up tests
You'll need to import the webpack config for running tests, [refer to this gist](https://gist.github.com/stoikerty/a202280147910b63a20e167dc4778fb8) for the setup. You'll be able to write your tests in ES2015, just like the rest of your app. Single tests can also be run in a watch-mode with the `npm run test-single`-command.

## Use server with server-side rendering

You can use your project as an universal/isomorphic server-side-rendered app.<br>**For advanced users only.**
```bash
# Compile and run `src/server/app` (-s or --serve)
dev-toolkit --serve
```

## Misc

#### Check version
```bash
# Check Version (-v or --version)
dev-toolkit -v
```

#### Define what modules are bundled into `vendor.js`
```js
// in your package.json, add `vendor` in `toolkitSettings` section
"toolkitSettings": {
  "vendor": [
    "react",
    "react-dom",
    "react-router"
  ]
},
```

#### Define what environment variables are available on client
```js
// In your package.json, add `sharedEnvs` in `toolkitSettings` section.
// The named variables will be available on the client via an exposed global `buildSettings.env`
"toolkitSettings": {
  "sharedEnvs": [
    "NODE_ENV",
    "API_DOMAIN"
  ]
},
```

## Features

##### Compatibility

- Multiplatform: Windows, OSX, Linux
- Node.js `last tested version 5.10.1`
- NPM `last tested version 3.8.3`

##### Javascript Basics

- [React]
- [ES2015 / ES6]
- [root-relative imports with `src/...`]
- [ESLint]

##### Developer Convenience

- [Browsersync]
- [Vanilla HMR, webpack's hot-reload]
- [jsx-control-statements]
- [`transform-class-properties` support]
- automatic asset-hashing during build, custom `vendor.js`
- support for various file-formats:<br>  `css`, `scss`<br>  `js`, `jsx`, `json`<br>  `jpg`, `png`, `gif`, `svg`

##### Powerful CSS Tools

- [Autoprefixer]
- [sass / scss]
- [css-modules]

##### Server-tools for Universal Apps

- your own server app in `src/server/app`
- [powered by express]
- [react-router]

[ES2015 / ES6]: https://babeljs.io/docs/learn-es2015/
[`transform-class-properties` support]: https://babeljs.io/docs/plugins/transform-class-properties/
[root-relative imports with `src/...`]: http://survivejs.com/webpack/requiring-files/
[Vanilla HMR, webpack's hot-reload]: https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
[Browsersync]: https://browsersync.io/
[ESLint]: http://eslint.org/
[React]: https://facebook.github.io/react/
[jsx-control-statements]: https://github.com/AlexGilleran/jsx-control-statements
[sass / scss]: http://sass-lang.com/
[css-modules]: https://github.com/css-modules/css-modules
[Autoprefixer]: https://github.com/postcss/autoprefixer
[powered by express]: http://expressjs.com/
[react-router]: https://github.com/reactjs/react-router


## FAQ
- *I get an NPM warning after `--init` about `eslint-import-resolver`.*

The package doesn't know that we're using webpack via the dev-toolkit and since webpack is not present in the dependencies, it throws an `UNMET PEER DEPENDENCY`-warning.

- *The `dev-toolkit`-package is not part of the dependencies of the starting point I created with `--init`.*

Since you already installed `dev-toolkit` globally, it would be easier to work on multiple projects without reinstalling the `dev-toolkit`-dependencies for each project. This way when you update the toolkit with `npm install -g dev-toolkit@version`, all your projects are updated as well.

You can of course still pin your project with a specific version of the toolkit by running `npm install --save-dev dev-toolkit` inside your project folder.

---

<!-- -->

**Questions? Bugs? Suggestions?** Create [a new issue](https://github.com/stoikerty/dev-toolkit/issues/new) or submit a PR!<br>Check out [the Contributing Guidelines](/CONTRIBUTING.md) for information on how to work on the toolkit itself.

---

<sub>kindly supported by <a href="https://www.browserstack.com">BrowserStack</a>.</sub>
