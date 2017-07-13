/* eslint-disable import/no-dynamic-require, global-require */
import webpack from 'webpack';
import fileExists from 'file-exists';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverAppEntryPoint } from '../webpack/projectSettings';
import config from '../webpack/config';

if (fileExists(serverAppEntryPoint)) {
  //
}

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
});
