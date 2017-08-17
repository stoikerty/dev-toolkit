module.exports = {
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('jsx-control-statements'),
    require.resolve('babel-plugin-transform-class-properties'),
  ],
};
