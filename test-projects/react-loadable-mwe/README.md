# `react-loadable` Minimum Working Example
## Preparing the Way
```shell
# New hotness.
$ yarn
# Old and busted.
$ npm install
```

## Running the App
Mash this into your favorite terminal emulator...

```shell
$ webpack && ./app.js
```

...then point your browser at <http://localhost:3000>.

## What to Observe
* React _does not_ emit a warning about unusable DOM when you navigate directly to a child page (e.g., <http://localhost:3000/dinosaurs/t-rex>): it smoothly and uncomplainingly takes over when it boots.
* Each code-split child page loads a different set of JavaScript files, determined at runtime based on React Loadable's cache of Webpack modules IDs.
* We use Webpack 2's new `HashedModuleIdsPlugin` for both our client and server builds. This allows us to slightly vary the builds' configuration between client and server (e.g., by loading different polyfills via `babel-preset-env`) without drift between the client- and server-side modules' IDs.

## Thanks to...
...@thejameskyle, whose work on React Loadable is beautiful and whose sample code paved the way for this nonsense.

## Questions?
Open a ticket or a PR and I'll do my darnedest.
