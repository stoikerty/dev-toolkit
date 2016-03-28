import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';

config.devtool = 'source-map';
config.entry = ['webpack-hot-middleware/client'].concat(config.entry);

const compiler = webpack(config);

// Use the express production server
import '../../src/server/app';

// Use middleware for hot-reloading
app.server.instance.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.server.instance.use(webpackHotMiddleware(compiler));

app.server.start({
  message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.'
});
