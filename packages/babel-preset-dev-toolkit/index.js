'use strict';

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  presets: [
    require.resolve('babel-preset-env'),
    // Use create-react-app default
    require.resolve('babel-preset-react-app'),
  ],
  plugins: [
    // Support `import()`-statement
    require.resolve('babel-plugin-dynamic-import-node'),
    // Sane if-statements for React
    require.resolve('jsx-control-statements'),
    // Allow root-relative imports for client & server
    [
      require.resolve('babel-plugin-module-resolver'), {
        root: ['.'],
      },
    ],
  ],
};
