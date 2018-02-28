import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, optimize } from 'webpack';
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

export default ({ getWebpackAssets, creatingBuild, userSettings } = { creatingBuild: true }) => {
  const namingConvention = creatingBuild ? '[name].[chunkhash]' : '[name]';
  const customizationOptions = {
    projectRoot,
    creatingBuild,
    namingConvention,
    assetsPath,
    publicPath,
    babelrc,
  };

  // Allow completely extending webpack with `webpack.customize`
  return userSettings.webpack.customize(
    {
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
        rules: [
          {
            test: /\.jsx?$/,
            loaders: [`babel-loader?${JSON.stringify(babelrc)}`],
            exclude: /(node_modules)|\.route.jsx?$|\.dynamic.jsx?$/,
          },
          {
            test: /\.route.jsx?$|\.dynamic.jsx?$/,
            loaders: [
              // `bundle`-loader automatically uses module directly when code is run on the server
              'bundle-loader?lazy&name=[name]',
              `babel-loader?${JSON.stringify(babelrc)}`,
            ],
            exclude: /(node_modules)/,
          },
        ].concat(
          // Add any user settings from `webpack.loaders`
          userSettings.webpack.rules(customizationOptions)
        ),
      },
      plugins: [
        new DefinePlugin({
          devToolkitSettings: JSON.stringify(userSettings.devToolkit),
          // React & Redux rely on this to be set explicitly
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ]
        .concat(
          getWebpackAssets
            ? [
                new AssetsPlugin({
                  path: assetsManifestFolder,
                  filename: assetsManifestName,
                  processOutput: getWebpackAssets,
                }),
              ]
            : []
        )
        .concat(
          creatingBuild
            ? [new optimize.UglifyJsPlugin()]
            : [new HotModuleReplacementPlugin(), new NoEmitOnErrorsPlugin()]
        )
        .concat(
          // Add any user settings from `webpack.plugins`
          userSettings.webpack.plugins(customizationOptions)
        ),
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
    },

    customizationOptions
  );
};
