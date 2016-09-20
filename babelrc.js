module.exports = {
  babelrc: false,

  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('jsx-control-statements'),
    require.resolve('babel-plugin-transform-class-properties'),
  ],

  extensions: ['.jsx', '.js'],
};
