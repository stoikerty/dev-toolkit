import rimraf from 'rimraf';
import webpack from 'webpack';
import chalk from 'chalk';
import fileExists from 'file-exists';

import debug from './utils/debug';
import config from './webpack/config';
import GenerateDynamicPages from './build/GenerateDynamicPages';
import { scriptOptions, PATHS } from './_userSettings';

// delete previous build folder & compile all files necessary for serving
rimraf(PATHS.buildFolder, (error) => {
  if (error) {
    console.log(error);
  }

  const compiler = webpack(config);
  compiler.run((err) => {
    if (err) {
      console.log(err);
    }

    if (scriptOptions.dynamic) {
      debug('dynamicRender.js exists?', fileExists(PATHS.dynamicRender));

      if (!fileExists(PATHS.dynamicRender)) {
        console.log(
          chalk.yellow('To make use of dynamic pages, add the file'),
          chalk.magenta('`src/server/dynamicRender.js`'),
          chalk.yellow('\nsee:'),
          chalk.yellow.underline('https://github.com/stoikerty/dev-toolkit/wiki/dynamic-pages'),
          '\nA regular static build was created.');
      } else {
        try {
          // Use similar setup as for a test-environment (but with NODE_ENV set to `production`)
          // eslint-disable-next-line global-require
          require('./utils/testHelpers/setupDOM');
          // eslint-disable-next-line global-require
          require('./utils/testHelpers/setupClientApp');
          // eslint-disable-next-line global-require
          const dynamicRender = require(PATHS.dynamicRender).default;

          console.log('Generating', chalk.magenta('index.html'), 'for each route...');

          // Take index.html file and create an html-file for each route
          // eslint-disable-next-line no-new
          new GenerateDynamicPages({
            dynamicRender,
            paths: PATHS,
          });
        } catch (e) {
          if (e) {
            console.log(e);
          }
        }
      }
    } else {
      console.log(' ⭐️  Your build is ready ⭐️');
    }
  });
});
