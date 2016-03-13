import webpack from 'webpack';
import config from './config';

// Use the express production server
import '../src/server/app';

const compiler = webpack(config);

compiler.watch({}, (err, stats)=>{
  if (err) {
    return reject(err);
  }

  // output what's happening within webpack
  console.log(stats.toString(config.stats));
});

// `webpack-hot-middleware` Example
//   https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/server.js

// // Attach the dev middleware...
// app.server.instance.use(require("webpack-dev-middleware")(compiler, {
//   noInfo: true, publicPath: config.output.path
// }));
//
// // ...and hot middleware for development purposes
// app.server.instance.use(require("webpack-hot-middleware")(compiler, {
//   log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
// }));

console.log("Project Server listening on http://%s:%s", app.server.hostname, app.server.port);
app.server.instance.listen(app.server.port);
