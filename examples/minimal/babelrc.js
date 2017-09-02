// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  presets: [
    require.resolve('babel-preset-dev-toolkit'),
  ],
};
