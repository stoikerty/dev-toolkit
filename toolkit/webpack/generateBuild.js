import webpack from 'webpack';
import config from './config';

global.usesServerRendering = false;

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats)=>{
  // output what's happening within webpack
  console.log(stats.toString(config.stats));
});
