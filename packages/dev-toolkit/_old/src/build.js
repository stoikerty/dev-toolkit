import rimraf from 'rimraf';
import webpack from 'webpack';
import fileExists from 'file-exists';
import DynamicPages from 'dynamic-pages';

import debug from './utils/debug';
import config from './webpack/config';
import { scriptOptions, PATHS } from './_userSettings';

// delete previous build folder & compile all files necessary for serving
rimraf(PATHS.buildFolder, (error) => {
  if (error) {
    console.log(error);
  }

  if (scriptOptions.dynamic) {
    // Use similar setup as for a test-environment (but with NODE_ENV set to `production`)
    // eslint-disable-next-line global-require
    require('./utils/testHelpers/setupDOM');

    debug('dynamicRender.js exists?', fileExists(PATHS.dynamicRender));
    // The external render file needs to be imported before compilation, in case any stubs exist
    DynamicPages.importDynamicRenderFile({ dynamicRenderFile: PATHS.dynamicRenderFile });

    // eslint-disable-next-line global-require
    require('./utils/testHelpers/setupClientApp');
  }

  const compiler = webpack(config);
  compiler.run((err) => {
    if (err) {
      console.log(err);
    }

    if (scriptOptions.dynamic) {
      // Take index.html file and create an html-file for each route
      DynamicPages.generatePages({
        publicPath: PATHS.publicPath,
        buildFolder: PATHS.buildFolder,
        manifestFile: PATHS.manifestFile,
        doneCallback: () => console.log('\n ⭐️  Your build with dynamic pages is ready ⭐️'),
      });
    } else {
      console.log(' ⭐️  Your build is ready ⭐️');
    }
  });
});
