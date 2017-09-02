'use strict';

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  presets: [
    require.resolve('babel-preset-react-app'),
  ],
  plugins: [
    // Sane if-statements
    require.resolve('jsx-control-statements'),
    // allows root-relative imports
    [
      require.resolve('babel-plugin-module-resolver'), {
        root: ['.'],
      },
    ],
  ],
};
