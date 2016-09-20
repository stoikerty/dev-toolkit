import rimraf from 'rimraf';
import webpack from 'webpack';
import chalk from 'chalk';
import fileExists from 'file-exists';
import DynamicPages from 'dynamic-pages';

import debug from './utils/debug';
import config from './webpack/config';
import { scriptOptions, PATHS } from './_userSettings';

// delete previous build folder & compile all files necessary for serving
// rimraf(PATHS.buildFolder, (error) => {
//   if (error) {
//     console.log(error);
//   }
//
//   const compiler = webpack(config);
//   compiler.run((err) => {
//     if (err) {
//       console.log(err);
//     }
//
//     if (scriptOptions.dynamic) {
      debug('dynamicRender.js exists?', fileExists(PATHS.dynamicRender));

      // Use similar setup as for a test-environment (but with NODE_ENV set to `production`)
      // eslint-disable-next-line global-require
      require('./utils/testHelpers/setupDOM');
      // eslint-disable-next-line global-require
      require('./utils/testHelpers/setupClientApp');

      // Take index.html file and create an html-file for each route
      DynamicPages.generatePages({
        publicPath: PATHS.publicPath,
        dynamicRenderFile: PATHS.dynamicRenderFile,
        buildFolder: PATHS.buildFolder,
        manifestFile: PATHS.manifestFile,
      });
//     } else {
//       console.log(' ⭐️  Your build is ready ⭐️');
//     }
//   });
// });
