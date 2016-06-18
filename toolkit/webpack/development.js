import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';
import { rootForRequire } from './userSettings';

const compiler = webpack(config);

config.devtool = 'source-map';
// use forEach here if there is more than one entry (such as `vendor`)
config.entry.app = ['webpack-hot-middleware/client'].concat(config.entry.app);

// Use the express production server
const ServerApp = require(path.join(rootForRequire, '/src/server/app')).default;
const server = new ServerApp;

// Bind middleware for hot-reloading
server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
server.use(webpackHotMiddleware(compiler));

server.start({
  message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.',
});
