import webpack from 'webpack';
import path from 'path';

import config from './webpack/config';
// import generateStaticFiles from './production/generateStaticFiles';
import { rootForRequire } from './_userSettings';

// Use similar setup as for a test-environment (but with NODE_ENV set to `production`)
// eslint-disable-next-line global-require
require('./utils/testHelpers/setupDOM');
// eslint-disable-next-line global-require
require('./utils/testHelpers/setupClientApp');

// compile all files necessary for serving
const compiler = webpack(config);
compiler.run((err, stats) => {
  // output what's happening within webpack
  console.log(stats.toString(config.stats));
  const message = '\n\n 🍰  Your build files are ready 💪\n';

  // Take index.html file and create an html-file for each route
  // generateStaticFiles(PATHS, message);
});
