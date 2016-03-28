import webpack from 'webpack';
import config from './config';

// Use the express production server
import '../../src/server/app';

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats)=>{
  // output what's happening within webpack
  app.log(stats.toString(config.stats));
});

// start the server
app.server.start();
