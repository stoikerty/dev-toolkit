'use strict';
const path = require('path');

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149
var preset = {
  presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
  plugins: [
    // class { handleThing = () => { } }
    require.resolve('@babel/plugin-proposal-class-properties'),

    // { ...todo, completed: true }
    require.resolve('@babel/plugin-proposal-object-rest-spread'),

    // support for async/await
    require.resolve('@babel/plugin-transform-runtime'),

    // Support dynamic `import()`-statement everywhere
    require.resolve('babel-plugin-transform-dynamic-import'),

    // Sane if-statements for React
    require.resolve('babel-plugin-jsx-control-statements'),

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
  ],
};

// Warn Users to make sure we don't have an invalid `NODE_ENV`
var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'Using `babel-preset-dev-toolkit` requires that you specify `NODE_ENV` or ' +
      '`BABEL_ENV` environment variables. Valid values are "development", ' +
      '"test", and "production". Instead, received: ' +
      JSON.stringify(env) +
      '.'
  );
}

if (env === 'development' || env === 'test') {
  preset.plugins.push.apply(preset.plugins, [
    // Adds component stack to warning messages
    require.resolve('@babel/plugin-transform-react-jsx-source'),
  ]);
}

if (env === 'test') {
  preset.plugins.push.apply(preset.plugins, [
    // Transform ES modules to commonjs for Jest support
    [require.resolve('@babel/plugin-transform-modules-commonjs'), { loose: true }],
  ]);
}

if (env === 'production') {
  preset.plugins.push.apply(preset.plugins, [
    require.resolve('babel-plugin-transform-react-remove-prop-types'),
  ]);
}

module.exports = (api, opts) => preset;
