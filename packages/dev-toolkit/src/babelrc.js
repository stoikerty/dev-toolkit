export default {
  babelrc: false,

  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-es2016'),
    require.resolve('babel-preset-es2017'),
    require.resolve('babel-preset-stage-1'),
    // require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('babel-plugin-dynamic-import-node'),
    // require.resolve('jsx-control-statements'),
    // require.resolve('babel-plugin-transform-class-properties'),
    // require.resolve('babel-plugin-transform-react-jsx-source'),
  ],

  extensions: ['.jsx', '.js'],
};
