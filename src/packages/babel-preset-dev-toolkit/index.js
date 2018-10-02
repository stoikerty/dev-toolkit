'use strict';
const path = require('path');

// Warn Users to make sure we don't have an invalid `NODE_ENV`
var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'Using `babel-preset-dev-toolkit` requires that you specify `NODE_ENV` or ' +
      '`BABEL_ENV` environment variables. Valid values are "development", ' +
      '"test", and "production". Instead, received: ' +
      JSON.stringify(env) +
      ".\nNOTE: `babel-preset-dev-toolkit` uses facebook's `babel-preset-react-app`" +
      ' under the hood which has the same requirement.\n\n'
  );
}

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149
module.exports = () => ({
  presets: [
    // Use create-react-app default
    require.resolve('babel-preset-react-app'),
  ],
  plugins: []
    .concat(
      env !== 'test'
        ? // Support dynamic `import()`-statement everywhere
          [require.resolve('babel-plugin-transform-dynamic-import')]
        : // Ignore transform-dynamic-import in `test` env since `babel-preset-react-app` already includes it
          []
    )
    .concat([
      // Sane if-statements for React
      require.resolve('jsx-control-statements'),
      // Allow root-relative imports for client & server
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          // using `process.cwd` makes it also work with `import()`
          root: ['./src'],
          alias: {
            src: path.resolve(process.cwd(), 'src'),
          },
        },
      ],
    ]),
});
