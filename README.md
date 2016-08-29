<img src="/dev-toolkit-logo.png" alt="universal-dev-toolkit-logo" height='40'><sub>**v5.2.0**</sub>

**Javascript Development Toolkit**<br>
Jump-start your `react`-powered Native Web App.
<br>[`# Dynamic Pages`](#generate-a-static-build-with-dynamic-pages) [`# sass & css-modules`](#powerful-css-tools) [`# server-rendering`](#use-server-in-production) [`# hot-reload`](#developer-convenience)

##### Create a new project
```bash
# install & initialize new app
npm install -g dev-toolkit
dev-toolkit --init my_app
cd my_app

# run it via npm scripts
npm run dev
# or run it directly (-w or --watch)
dev-toolkit --watch
```

##### Generate a static build
```bash
# Create `build`-folder with compiled files (-b or --build)
dev-toolkit --build
```
- removes previous `build`-folder
- generates static markup for React (*coming soon*)
- automatically uses production-builds of React and Redux
- extracts css from individual modules
- hashes assets, including `jpg`, `png`, `gif` & `svg`-files

##### Generate a static build with dynamic pages
*(coming soon)*<br>
To make use of dynamic pages and components for making your app load faster, [follow the instructions](https://github.com/stoikerty/dev-toolkit/wiki/dynamic-pages) and use the extended build command:
```bash
# This will create an index-file for each dynamic route (-d --dynamic or --build --dynamic)
dev-toolkit --build --dynamic
```
- creates multiple js-bundles for each dynamic page
- each `index.html` contains a `script`-link to the `app` bundle and the page-bundle
- scripts use `async` and `defer`-attributes as appropriate

---

###### Use server in production
*(experimental)*<br>
```bash
# Compile and run `src/server/app` (-s or --serve)
dev-toolkit --serve
```
Use your project as an universal/isomorphic server-rendered app.

###### Check version
```bash
# Check Version (-v or --version)
dev-toolkit -v
```

###### Define what modules are bundled into `vendor.js`
```js
// in your package.json, add `toolkitSettings` section
"toolkitSettings": {
  "vendor": [
    "react",
    "react-dom",
    "react-router"
  ]
},
```

---
### Features

###### Javascript Basics

-   [React]
-   [ES2015 / ES6]
-   [root-relative imports with `src/...`]
-   [ESLint]

###### Developer Convenience

-   [Browsersync]
-   [Vanilla HMR, webpack's hot-reload]
-   [jsx-control-statements]
-   [`transform-class-properties` support]
-   Support for various file-formats:<br>
    `css`, `scss`<br>
    `js`, `jsx`, `json`<br>
    `jpg`, `png`, `gif`, `svg`

###### Powerful CSS Tools

-   [Autoprefixer]
-   [sass / scss]
-   [css-modules]

###### Server-tools for Universal Apps

-   [express]
-   [react-router]

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
[express]: http://expressjs.com/
[react-router]: https://github.com/reactjs/react-router

---

[![Codewake](https://www.codewake.com/badges/ask_question.svg)](https://www.codewake.com/p/dev-toolkit)
[![Join the chat at https://gitter.im/stoikerty/dev-toolkit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/stoikerty/dev-toolkit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<!-- -->

Fancy working on the toolkit itself? [This wiki](https://github.com/stoikerty/dev-toolkit/wiki/Developing-on-the-Toolkit-itself) could be useful to you.

---

<sub>kindly supported by <a href="https://www.browserstack.com">BrowserStack</a>.</sub>
