import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';

// Use the express production server
import '../../src/server/app';

const compiler = webpack(config);

app.server.instance.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.server.instance.use(webpackHotMiddleware(compiler));

app.server.start({message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.'});
