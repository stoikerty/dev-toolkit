# babel-runner

A wrapper around `babel-register` to make universal usage of files easier. Automatically imports a `babelrc.js` or `.babelrc`-file as well as a `nodeHooks.js` file at the root of your project.

## Usage - Command-line
```bash
babel-runner --run myuniversalfile.js
```

## Usage - Command-line
```js
const babelRunner = require('babel-runner');

babelRunner({
  fileToRun: path.resolve(__dirname, `./myuniversalfile.js`),
});
```
