import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import { babelrc } from 'babel-runner';

import {
  devToolkitRoot,
  projectRoot,
  assetsPath,
  entryPoint,
  publicPath,
  assetsManifestFolder,
  assetsManifestName,
} from './projectSettings';

export default ({ getWebpackAssets, createBuild } = { createBuild: true }) => {
  const namingConvention = createBuild ? '[name].[chunkhash]' : '[name]';

  return {
    entry: {
      app: [entryPoint],
    },
    output: {
      path: assetsPath,
      filename: `${namingConvention}.js`,
      chunkFilename: `${namingConvention}.js`,
      publicPath,
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [
            `babel-loader?${JSON.stringify(babelrc)}`,
            // `eslint-loader?${JSON.stringify(eslintConfig)}`,
          ],
          exclude: /(node_modules)|\.route.jsx?$|\.dynamic.jsx?$/,
        },
        {
          test: /\.route.jsx?$|\.dynamic.jsx?$/,
          loaders: [
            // The`bundle`-loader automatically uses module directly when code is run on the server
            'bundle-loader?lazy&name=[name]',
            `babel-loader?${JSON.stringify(babelrc)}`,
            // `eslint-loader?${JSON.stringify(eslintConfig)}`,
          ],
          exclude: /(node_modules)/,
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        buildSettings: {
          env: JSON.stringify({
            NODE_ENV: process.env.NODE_ENV,
            // extract remaining env variables
          }),
        },
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ].concat(getWebpackAssets ? [
      new AssetsPlugin({
        path: assetsManifestFolder,
        filename: assetsManifestName,
        processOutput: getWebpackAssets,
      }),
    ] : []).concat(createBuild ? [] : [
      new HotModuleReplacementPlugin(),
      new NoEmitOnErrorsPlugin(),
    ]),
    resolve: {
      modules: [
        // Resolve dev-toolkit related modules like 'webpack-hot-middleware/client'
        path.resolve(devToolkitRoot, 'node_modules'),
        // Resolve all other modules from client app
        path.resolve(projectRoot, 'node_modules'),
        'node_modules',
      ],
    },
    resolveLoader: {
      modules: [
        // Resolve dev-toolkit related webpack loaders like 'babel-loader'
        path.resolve(devToolkitRoot, 'node_modules'),
        // Resolve webpack loaders related to project
        path.resolve(projectRoot, 'node_modules'),
        'node_modules',
      ],
    },
  };
};
