/* eslint-disable import/no-dynamic-require, global-require */
import chalk from 'chalk';
import webpack from 'webpack';
import fileExists from 'file-exists';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverAppEntryPoint } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { help } from '../utilities';

console.log(chalk.grey('Importing Server App…'));

import(serverAppEntryPoint).then((module) => {
  const server = module.default;
  let webpackAssets = {};
  const config = generateConfig({
    getWebpackAssets: (assets) => { webpackAssets = assets; return JSON.stringify(assets); },
  });

  console.log(chalk.grey('Starting Webpack…'));

  // Compile with middleware for hot-reloading
  const compiler = webpack(
    {
      ...config,
      devtool: 'source-map',
      entry: {
        ...config.entry,
        app: ['webpack-hot-middleware/client'].concat(config.entry.app),
      },
    },
    (webpackError) => {
      if (webpackError) {
        console.log(chalk.red('Webpack Error:'), webpackError, '\n');
      }

      console.log(
        chalk.grey('Compiling initial bundle…'),
        '\n',
      );

      const webpackDevMiddlewareInstance = webpackDevMiddleware(
        compiler,
        { noInfo: true, publicPath: config.output.publicPath },
      );
      const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

      webpackDevMiddlewareInstance.waitUntilValid(() => {
        console.log(chalk.green('\n✨  Initial compilation has finished.'));
        console.log(chalk.grey('Attaching dev-middleware & hot-middleware…'));
        try {
          server.use(webpackDevMiddlewareInstance);
          server.use(webpackHotMiddlewareInstance);
        } catch (error) {
          help({
            warning: 'Your server needs a `.use`-method for attaching webpack middleware.',
            instruction: 'Example: `use(...options) { this.express.use(...options); }`',
            link: '/dev-toolkit#custom-server',
            error,
          });
        }

        console.log(chalk.grey('Starting your Server App…'), '\n');
        try {
          server.start({ assets: webpackAssets });
        } catch (error) {
          help({
            warning: 'Your server needs a `.start`-method.',
            instruction: 'Example: `start({ generatedAssets }) { this.express.listen(2000); }`',
            link: '/dev-toolkit#custom-server',
            error,
          });
        }
      });
    },
  );
}).catch((error) => {
  if (fileExists(serverAppEntryPoint)) {
    // It's possible that we will catch compilation/import-errors, so log those directly
    console.log(chalk.red('Error:'), error, '\n');
  } else {
    help({
      warning: 'You need a server app entry point.',
      instruction: 'Do you have the file `src/server/index.js`?',
      link: '/dev-toolkit#custom-server',
      error,
    });
  }
});
