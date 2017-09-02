import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import { babelrc } from 'babel-runner';

import {
  projectRoot,
  buildFolder,
  entryPoint,
  defaultPublicPath,
  publicPath,
  assetsFolder,
  assetsManifestName,
} from './projectSettings';

export default ({ getWebpackAssets, createBuild } = { createBuild: true }) => {
  const namingConvention = createBuild ? '[name].[chunkhash]' : '[name]';

  return {
    entry: {
      app: [entryPoint],
    },
    output: {
      path: buildFolder,
      filename: `${namingConvention}.js`,
      chunkFilename: `${namingConvention}.js`,
      publicPath: createBuild ? publicPath : defaultPublicPath,
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
        // Ignore the generated file by putting it into the `dist`-folder
        path: assetsFolder,
        filename: assetsManifestName,
        processOutput: getWebpackAssets,
      }),
    ] : []).concat(createBuild ? [] : [
      new HotModuleReplacementPlugin(),
      new NoEmitOnErrorsPlugin(),
    ]),
    resolve: {
      alias: {
        src: path.resolve(projectRoot, 'src'),
      },
    },
  };
};
