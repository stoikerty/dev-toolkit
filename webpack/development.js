import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';

// Use the express production server
import '../src/server/app';

const compiler = webpack(config);

// compiler.watch({}, (err, stats)=>{
//   if (err) {
//     return reject(err);
//   }
//
//   // output what's happening within webpack
//   console.log(stats.toString(config.stats));
// });

app.server.instance.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.server.instance.use(webpackHotMiddleware(compiler))

app.server.start();
