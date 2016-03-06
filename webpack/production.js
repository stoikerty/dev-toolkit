import webpack from 'webpack';
import config from './config';

// Use the express production server
import '../src/server/app';

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats)=>{
  if (err) {
    return reject(err);
  }

  // output what's happening within webpack
  console.log(stats.toString(config.stats));
});

// Start Server on specific port
console.log("Project Server listening on http://%s:%s", app.server.hostname, app.server.port);
app.server.instance.listen(app.server.port);
