import webpack from 'webpack';
import config from './config';

const compiler = webpack(config);

compiler.run((err, stats)=>{
  if (err) {
    return reject(err);
  }

  // output what's happening within webpack
  console.log(stats.toString(config.stats));
});
