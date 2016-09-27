import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack/config';
import { rootForRequire } from './_userSettings';

// Use the express production server
const ServerApp = require(path.join(rootForRequire, '/src/server/app')).default;
const server = new ServerApp();

// Compile with webpack & bind middleware for hot-reloading
config.devtool = 'source-map';
config.entry.app = ['webpack-hot-middleware/client'].concat(config.entry.app);
const compiler = webpack(config);
server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
server.use(webpackHotMiddleware(compiler));

server.start({
  message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.',
});
