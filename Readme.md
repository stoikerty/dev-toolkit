 :star2: universal-dev-toolkit :star2:
=============
<sub>Development Toolkit by [@stoikerty](https://twitter.com/stoikerty), kindly supported by ![BrowserStack-Image](https://raw.githubusercontent.com/stoikerty/universal-dev-toolkit/master/browserstack-logo.png) [BrowserStack](https://www.browserstack.com).</sub>

## How to Use <small>- Getting started quickly</small>
- Install Node : [Node Platform](https://nodejs.org/) <small>*(I'm using v5.6.0 but v4.2 LTS should work too)*</small><br>
- **Install the dependencies via npm** : `npm install`<br>
- **Start Server with Asset Watcher** : `npm run dev`<br>

You should now be ready to start building your project. If it doesn't work, feel free to [report an issue or help somebody out](https://github.com/stoikerty/universal-dev-toolkit/issues).

:point_right:  Your source-files will be **hot-reloaded** and proxied via `http://localhost:3000`.

*You will be working with [Universal Javascript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.llvvuk4l5), managed via [webpack](https://webpack.github.io/), therefore your source-code located in `src` will be divided into 2 directories, `client` and `server`. The `layout.html` is located in `src\server\views`*.

I use [Express](http://expressjs.com/) with [React-Router](https://github.com/reactjs/react-router), [React](https://facebook.github.io/react/) and [SCSS](http://sass-lang.com/) with [Autoprefixer](https://github.com/postcss/autoprefixer) to build my projects. There are a few customisations although I kept the files to a minimum to allow for exploration and you being able to change things to your liking.

---

#### Creating a Build, how webpack is configured
- Build production files for transferring to Server with `npm run build`. The server runs on port `2000`.
- Lint your files using [eslint](http://eslint.org/) with `npm run lint`.

Have a look at the `package.json` for a full list of dependencies. The webpack folder contains a **`webpack/config.js`** that is used both for running **`webpack/development.js`** <small>(via `npm run dev`)</small> and **`webpack/production.js`** <small>(via `npm run build`)</small>.

#### Decisions :foggy:

I opted to use [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for adding hot-reload functionality via a server that you can customize separately in the `src`-folder. The state of React-components is not kept as I'm looking to work with Redux, I got the idea to stop using unsafe transforms from and reduce the complexity of Babel Transforms via [an Article I read "Hot Reloading in React - *or, an Ode to Accidental Complexity*"](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.3mce9tv45) and the resulting discussion in [a Redux pull-request](https://github.com/reactjs/redux/pull/1455).

CSS is imported via [css-modules](https://github.com/css-modules/css-modules). If you have never heard about css-modules, read ["CSS Modules - *Welcome to the Future*"](http://glenmaddern.com/articles/css-modules).

Currently there is no test-suite. I might add one if I get more exposure into using tests myself. Although I do like keeping the toolkit simple instead of adding all sorts of dependencies just for the sake of having more features. You can always add your own.
