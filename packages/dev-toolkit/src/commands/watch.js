/* eslint-disable import/no-dynamic-require, global-require */
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverAppEntryPoint } from '../webpack/projectSettings';
import config from '../webpack/config';

const help = ({ warning, instruction, link }) => {
  console.log(chalk.yellow(warning));
  console.log(chalk.green(instruction));
  console.log(chalk.gray(`see: https://github.com/stoikerty${link}`), '\n');
};

// Use our own server
import(serverAppEntryPoint).then((server) => {
  // Compile with middleware for hot-reloading
  const compiler = webpack({
    ...config,
    devtool: 'source-map',
    entry: {
      ...config.entry,
      app: ['webpack-hot-middleware/client'].concat(config.entry.app),
    },
  });

  server.use(webpackDevMiddleware(
    compiler,
    { noInfo: true, publicPath: config.output.publicPath },
  ));
  server.use(webpackHotMiddleware(compiler));

  server.start();
}).catch(() => help({
  warning: 'You need a server app entry point.',
  instruction: 'Add the file `src/server/index.js`',
  link: '/dev-toolkit#custom-server',
}));
