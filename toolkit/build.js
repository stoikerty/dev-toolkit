import webpack from 'webpack';

import config from './webpack/config';

const compiler = webpack(config);
compiler.run((err, stats) => {
  // output what's happening within webpack
  console.log(stats && stats.toString(config.stats) || '');
});
