/* eslint-disable import/no-dynamic-require, global-require */
import fs from 'fs';
import webpack from 'webpack';
import rimraf from 'rimraf';

import { serverAppEntryPoint, buildFolder } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { help, log } from '../utilities';

log({ message: 'Importing Server App…' });

import(serverAppEntryPoint).then((module) => {
  const server = module.default;

  log({ message: 'Deleting previous build folder…' });

  // delete previous build folder & compile all files necessary for serving
  rimraf(buildFolder, (rimrafError) => {
    log({ error: rimrafError });

    let webpackAssets = {};
    const config = generateConfig({
      getWebpackAssets: (assets) => { webpackAssets = assets; return JSON.stringify(assets); },
      createBuild: true,
    });

    log({ message: 'Starting Webpack…' });

    // Compile with middleware for hot-reloading
    const compiler = webpack(config,
      (webpackError) => {
        log({ error: webpackError });

        log({ message: 'Compiling Assets with Webpack…' });

        compiler.run((compilerError) => {
          log({ error: compilerError });
          log({ message: '\n✨  Finished compiling Assets.\n', type: 'success' });

          log({ message: 'Rendering html using Server App…' });
          help({
            displayedWhen: server && (typeof server.render !== 'function'),
            warning: 'Your server needs a `render`-method to create a build.',
            instruction: 'Example: `render({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
            link: '/dev-toolkit#custom-server',
          });
          const renderPromise = server.render({ assets: webpackAssets, buildFolder });
          help({
            displayedWhen: typeof renderPromise.then !== 'function',
            warning: 'The server `render`-method must return a Promise to say it\'s finished.',
            instruction: 'Example: `render({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
            link: '/dev-toolkit#custom-server',
          });
          renderPromise.then(() => {
            log({ message: '\n ⭐️  Your build is ready ⭐️', type: 'success' });
          }).catch(error => log({ error }));
        });
      },
    );
  });
}).catch((error) => {
  help({
    displayedWhen: !fs.existsSync(serverAppEntryPoint),
    warning: 'You need a server app entry point.',
    instruction: 'Do you have the file `src/server/index.js`?',
    link: '/dev-toolkit#custom-server',
    error,
  });
});
