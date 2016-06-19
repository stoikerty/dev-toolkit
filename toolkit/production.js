import webpack from 'webpack';
import path from 'path';

import config from './webpack/config';
import { rootForRequire } from './_userSettings';

const compiler = webpack(config);
compiler.run((err, stats) => {
  // output what's happening within webpack
  console.log(stats && stats.toString(config.stats) || '');
});

// Use the express production server
const ServerApp = require(path.join(rootForRequire, '/src/server/app')).default;
const server = new ServerApp;

server.start({
  message: '==> Browsersync should be launched soon. Use one of the Access URLs for development.',
});
