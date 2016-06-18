import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';

console.log('Running development');
config.devtool = 'source-map';
// use forEach here if there is more than one entry (such as `vendor`)
config.entry.app = ['webpack-hot-middleware/client'].concat(config.entry.app);

const compiler = webpack(config);
console.log('compiled config');

const projectRootWebpack = './';
const projectRootRequire = process.cwd();

// Use the express production server
const serverApp = require(path.join(projectRootRequire, '/src/server/app')).default;
// const serverApp = require(path.join(process.env.UDT_APP_PATH, '/src/server/app')).default;
const server = new serverApp;

// Bind middleware for hot-reloading
server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
server.use(webpackHotMiddleware(compiler));

server.start({
  message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.'
});
