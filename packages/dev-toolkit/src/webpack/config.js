import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import { DefinePlugin, HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';

import {
  isProd,
  namingConvention,
  projectRoot,
  buildFolder,
  entryPoint,
  defaultPublicPath,
  publicPath,
  babelConfig,
} from './projectSettings';

export default ({ getWebpackAssets }) => ({
  entry: {
    app: [entryPoint],
  },
  output: {
    path: buildFolder,
    filename: `${namingConvention}.js`,
    chunkFilename: `${namingConvention}.js`,
    publicPath: isProd ? publicPath : defaultPublicPath,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        `babel-loader?${JSON.stringify(babelConfig)}`,
        // `eslint-loader?${JSON.stringify(eslintConfig)}`,
      ],
      exclude: /(node_modules)|\.route.jsx?$|\.dynamic.jsx?$/,
    }],
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets-manifest.json',
      processOutput: getWebpackAssets,
    }),
    new DefinePlugin({
      buildSettings: {
        env: JSON.stringify(process.env),
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ].concat(isProd ? [] : [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
  ]),
  resolve: {
    alias: {
      src: path.resolve(projectRoot, 'src'),
    },
  },
});
