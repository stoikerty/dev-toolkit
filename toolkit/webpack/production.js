import webpack from 'webpack';
import config from './config';

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats)=>{
  // output what's happening within webpack
  app.log(stats.toString(config.stats));
});

// Use the express production server
import serverApp from '../../src/server/app';
const server = new serverApp;

// start the server
server.start();
