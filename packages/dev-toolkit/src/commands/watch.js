/* eslint-disable import/no-dynamic-require, global-require */
import chalk from 'chalk';
import webpack from 'webpack';
import fileExists from 'file-exists';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverAppEntryPoint } from '../webpack/projectSettings';
import config from '../webpack/config';
import { help } from '../utilities';

console.log(chalk.grey('Importing Server App…'));

import(serverAppEntryPoint).then((module) => {
  const server = module.default;

  console.log(chalk.grey('Start compiling with Webpack…'));

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
    (error) => {
      if (error) {
        console.log(chalk.red('Webpack Error:'), error, '\n');
      }

      console.log(
        chalk.grey('Attach dev-middleware & hot-middleware…'),
        '\n',
      );

      const webpackDevMiddlewareInstance = webpackDevMiddleware(
        compiler,
        { noInfo: true, publicPath: config.output.publicPath },
      );

      webpackDevMiddlewareInstance.waitUntilValid(() => {
        console.log(
          chalk.green('\n✔️  Initial compilation has finished.'),
          chalk.grey('\nStarting your Server App…'),
          '\n',
        );

        server.use(webpackDevMiddlewareInstance);
        server.use(webpackHotMiddleware(compiler));
        server.start();
      });
    },
  );
}).catch((error) => {
  if (!fileExists(serverAppEntryPoint)) {
    // It's possible that we will catch compilation/import-errors, so log those directly
    console.log(error);
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
