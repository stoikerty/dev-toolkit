<img src="/toolkit/documentation/logo.jpg" alt="universal-dev-toolkit-logo">
<p align="center"><sub>Javascript Development Toolkit by <a href="https://twitter.com/stoikerty">@stoikerty</a>, kindly supported by <a href="https://www.browserstack.com/"><img src="/toolkit/documentation/browserstack-logo.png" alt="BrowserStack-Image"></a> <a href="https://www.browserstack.com">BrowserStack</a>.</sub></p>

<br><br>
<img src="/toolkit/documentation/top-headers.jpg" alt="universal-dev-toolkit-logo">
<br>

<table>
  <tbody>
    <tr>
      <td width="33.3333%">
        Install <a href="https://nodejs.org/">Node v5.6.0</a>
        <br>
        <sub><em>(v4.2 LTS should work too)</em></sub>
        <br><br>

        <strong>Install dependencies</strong>
        <br>
        <code>npm install</code>
        <br><br>

        <strong>Start Server, watch assets</strong><br><code>npm run dev</code>
        <br><br>
      </td>
      <td width="33.3333%">

        <br>
        <ul>
          <li>
            <strong>src</strong>

            <ul>
              <li>
                client

                <ul>
                  <li>
                    <em>style</em>
                  </li>
                  <li>
                    <em>views</em>
                  </li>
                </ul>
              </li>
              <li>
                server

                <ul>
                  <li>
                    <em>public-files</em>
                  </li>
                  <li>
                    <em>views</em>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            <strong>toolkit</strong>

            <ul>
              <li>
                webpack
              </li>
              <li>
                documentation
              </li>
            </ul>
          </li>
        </ul>

        <ul>
          <li>
            <sub>package.json</sub>
          </li>
          <li>
            <sub>Readme.md</sub>
          </li>
          <li>
            <sub>...dotfiles</sub>
          </li>
        </ul>

      </td>
      <td width="33.3333%">

        <ul>
          <li>
            <a href="https://babeljs.io/docs/learn-es2015/">ES2015 / ES6</a>
          </li>
          <li>
            <a href="http://survivejs.com/webpack/requiring-files/">absolute imports</a>
          </li>
          <li>
            <a href="https://webpack.github.io/docs/hot-module-replacement-with-webpack.html">Vanilla HMR</a>
          </li>
          <li>
            <a href="https://browsersync.io/">Browsersync</a>
          </li>
          <li>
            <a href="http://eslint.org/">ESLint</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="https://facebook.github.io/react/">React</a>
          </li>
          <li>
            <a href="http://sass-lang.com/">sass / scss</a>
          </li>
          <li>
            <a href="https://github.com/css-modules/css-modules">css-modules</a>
          </li>
          <li>
            <a href="https://github.com/postcss/autoprefixer">Autoprefixer</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="http://expressjs.com/">express</a>
          </li>
          <li>
            <a href="https://github.com/reactjs/react-router">react-router</a>
          </li>
        </ul>

      </td>
    </tr>
    <tr>
      <td width="33.3333%">
        You should now be ready to start building your project.
        <br><br>
        If it doesn't work, feel free to <a href="https://github.com/stoikerty/universal-dev-toolkit/issues">report an issue or help somebody out</a>.
      </td>
      <td width="33.3333%">
        :point_right:  Your source-files will be <strong>hot-reloaded</strong> and proxied via <code>http://localhost:3000</code>.<br><br><em>You will be working with <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.llvvuk4l5">Universal Javascript</a>, managed via <a href="https://webpack.github.io/">webpack</a>.</em>        
      </td>
      <td width="33.3333%">

        Files are kept to a minimum to allow for exploration and customisation.

      </td>
    </tr>
  </tbody>
</table>

<br>

##### Some additional information <sub>/ quick clues for you</sub>

The `style`-directory can be accessed via absolute import in scss files.
```scss
@import 'style/config.scss';
```
The directories for absolute imports are defined in `webpack/config.js` under `modulesDirectories`.

The `layout.html` is located in `src/server/views` and only contains one javascript hook `app-body` to insert markup into from javascript. The server inserts markup via Handlebars.

Both the `server` and `client` have an `app.js` that serve as starting points.
<br><br>

##### Creating a Build <sub>/ webpack configuration</sub>
- **`npm run build`** To build production files for transferring to Server.<br>The server runs on port `2000`, it's available to change in `server/bootstrap.js` and `toolkit/webpack/config`.
- Lint your files using [eslint](http://eslint.org/) with **`npm run lint`**.

Have a look at the `package.json` for a full list of dependencies.

The webpack folder contains a **`webpack/config.js`** that is used both for running **`webpack/development.js`** <sub>(via `npm run dev`)</sub> and **`webpack/production.js`** <sub>(via `npm run build`)</sub>.
<br><br>

---

##### Decisions :foggy:

I opted to use [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) for adding hot-reload functionality. I'm using **vanilla HMR** which covers most of the benefits people are looking for in hot-reloaded javascript.

The state of React-components is not kept as I'm looking to work with Redux. I got the idea to stop using unsafe transforms and reduce the complexity of Babel Transforms via an Article I read called ["Hot Reloading in React - *or, an Ode to Accidental Complexity*"](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.3mce9tv45) and the resulting discussion in [a Redux pull-request](https://github.com/reactjs/redux/pull/1455).

CSS is imported using [css-modules](https://github.com/css-modules/css-modules). If you have never heard about css-modules, read ["CSS Modules - *Welcome to the Future*"](http://glenmaddern.com/articles/css-modules). It allows you to write css without using globals all over the place.

Currently there is no test-suite. I might add one if I get more exposure into using tests myself. Although I do like keeping the toolkit simple and extensible instead of adding all sorts of dependencies for the sake of having more features. Feel free to add your own if you need it.

---

*For more information, see [the release PR](https://github.com/stoikerty/universal-dev-toolkit/pull/1).*
