import webpack from 'webpack';
import path from 'path';

import config from './webpack/config';
import { rootForRequire } from './_userSettings';

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats) => {
  // output what's happening within webpack
  console.log(stats.toString(config.stats));
  const message = '\n\n 🍰  Your build files are ready, starting Server 💪\n';
  console.log(message);

  // Use the express production server
  // eslint-disable-next-line global-require
  const ServerApp = require(path.join(rootForRequire, '/src/server/app')).default;
  const server = new ServerApp();

  // start the server
  server.start({ serveBuild: true });
});
