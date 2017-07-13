import path from 'path';
import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack';

import {
  isProd,
  namingConvention,
  projectRoot,
  buildFolder,
  entryPoint,
  defaultPublicPath,
  publicPath,
} from './projectSettings';

export default {
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
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ].concat(isProd ? [] : [
    new HotModuleReplacementPlugin(),
  ]),
  resolve: {
    alias: {
      src: path.resolve(projectRoot, 'src'),
    },
  },
};
