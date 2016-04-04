<img src="/toolkit/documentation/logo.jpg" alt="universal-dev-toolkit-logo">
<p align="center"><sub>Javascript Development Toolkit by <a href="https://twitter.com/stoikerty">@stoikerty</a>, kindly supported by <a href="https://www.browserstack.com/"><img src="/toolkit/documentation/browserstack-logo.png" alt="BrowserStack-Image"></a> <a href="https://www.browserstack.com">BrowserStack</a>.</sub></p>

<br>
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

        <strong>Start a project</strong>
        <br>
        <strong><code>></code></strong> <code>npm start</code>
        <br><br>

        <strong>Use created src-folder</strong>
        <br>
        <strong><code>></code></strong> <code>cd src</code>
        <br>
        <strong><code>src></code></strong> <code>git init</code>
        <br><br>

        <strong>Start Server, watch assets</strong>
        <br>
        <strong><code>src></code></strong> <code>npm run dev</code>
        <br><br>
      </td>
      <td width="33.3333%">

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
              <li>
                <sub>package.json</sub>
              </li>
              <li>
                <sub>...dotfiles</sub>
              </li>
            </ul>
          </li>
        </ul>
        <hr>
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
        <br>
        <ul>
          <li>
            <a href="https://babeljs.io/docs/learn-es2015/">ES2015 / ES6</a>
          </li>
          <li>
            <a href="http://survivejs.com/webpack/requiring-files/">root-relative imports</a>
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
            <a href="https://github.com/AlexGilleran/jsx-control-statements">jsx-control-statements</a>
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
          <li>
            <a href="https://github.com/JedWatson/classnames">classnames</a>
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
        :point_right:  The <code>src</code> folder is yours to use and has customizable <code>package.json</code>, <code>.env</code> and <code>.eslintrc</code>-files separate from the toolkit.
        <br>
        <br>
        :point_right:  Your source-files will be <strong>hot-reloaded</strong> and proxied via <code>http://localhost:3000</code>. <small>(Default)</small><br><br><em>You will be working with <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.llvvuk4l5">Universal Javascript</a>, managed via <a href="https://webpack.github.io/">webpack</a>.</em>
      </td>
      <td width="33.3333%">

        Files are kept to a minimum to allow for exploration and customisation.
        <br>
        <br>
        The toolkit can be updated separately without affecting your project dependencies in <code>src</code>.

      </td>
    </tr>
  </tbody>
</table>

<br>

##### Some additional information <sub>/ quick clues for you</sub>

The `src/client/style`-directory can be accessed via root-import in scss files.
```scss
@import 'style/config.scss';
```

A similar solution also works for js-files, it works a bit differently because it needs to be compiled both for the client and for the server (via `babel-node` thanks to [`babel-root-import`](https://github.com/michaelzoidl/babel-root-import)).

Import files with `/src` as the base, using `~/`.
```js
// example import on client
import utils from '~/client/utils';
// example import on server
import utils from '~/server/utils';
```

The `layout.html` is located in `src/server/views` and only contains one javascript hook `app-body` to insert markup into from javascript. The server inserts markup via Handlebars. [Font Awesome](http://fortawesome.github.io/Font-Awesome/) and [Source Sans Pro](https://www.google.com/fonts/specimen/Source+Sans+Pro) are included in the `layout.html` as sane defaults.

<hr>

###### About `.env`
I've added [`better-npm-run`](https://github.com/benoror/better-npm-run) to make the usage of the configuration via environment-variables in `src/.env` easy. You can remove the dependency and omit `.env` to work with only the defaults.

###### About `app.js` & webpack
Both the `server` and `client` have an `app.js` that serve as starting points. They only contain the most necessary code to make it work with the toolkit. *All other files inside `src` serve mostly as an example of what a universal web app could look like.*

The `client/app.js` contains the hot-module-replacement functionality that is exposed via the webpack middleware, while the `server/app.js` contains a class-export that is ultimately imported into the toolkit and then started.

Webpack is configured via **`webpack/config.js`** which is used both for running **`webpack/development.js`** <sub>(`npm run dev`)</sub> and **`webpack/production.js`** <sub>(`npm run build`)</sub>.
<br><br>

##### Creating a Build <sub>/ and other useful commands</sub>

Run your commands inside the `src`-folder.
- **`npm run build`** builds production files for your hosted server.<br>They will be located outside `src`, in a new folder called `build`.
<br>
<sub>**configure the server port in `src/.env`**</sub>


- **`npm install [package]`** installs a package into your `src`-dependencies.
<br>
<sub>**configure your project-settings in `src/package.json`**</sub>


- **`npm run lint`** lints your files using [eslint](http://eslint.org/).
<br>
<sub>**configure your linting preferences in `src/.eslintrc`**</sub>

Once you have run `npm start`, you will have 2 `package.json`-files. The one inside the root-folder contains the development dependencies necessary for making the toolkit work. You shouldn't need to make any changes in that file unless you want to customize the toolkit itself. *(This will make it harder to update it in the future)*

The `package.json` inside the `src`-folder is the file you're most probably interested in since it relates directly to your project, it contains some dependencies to make the web app work, you should be able to modify it however you like.
<br><br>

---

*For more information, see the [Release History](https://github.com/stoikerty/universal-dev-toolkit/releases).*
