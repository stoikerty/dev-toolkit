// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-1',
    'babel-preset-react',
  ].map(require.resolve),
  plugins: [
    'babel-plugin-dynamic-import-node',
    'babel-plugin-transform-class-properties',
    'jsx-control-statements',
  ].map(require.resolve),
};
