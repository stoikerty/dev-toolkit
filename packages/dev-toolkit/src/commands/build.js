/* eslint-disable import/no-dynamic-require, global-require */
import webpack from 'webpack';
import { emptyDir } from 'fs-extra';

import { buildFolder } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { help, log, bootstrap } from '../utilities';

bootstrap().then(({ server, userSettings }) => {
  log({ message: 'Deleting previous build folder…' });

  // delete previous build folder & compile all files necessary for serving
  emptyDir(buildFolder, (error) => {
    log({ error });

    let webpackAssets = {};
    const config = generateConfig({
      creatingBuild: true,
      getWebpackAssets: (assets) => { webpackAssets = assets; return JSON.stringify(assets); },
      userSettings,
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
          const showSuccessMessage = () => log({ message: '\n⭐️  Your build is ready ⭐️\n', type: 'success' });

          if (userSettings.devToolkit.usePreRender) {
            log({ message: 'Rendering html using Server App… ', useSeparator: true });
            help({
              displayedWhen: server && (typeof server.preRender !== 'function'),
              warning: 'Your server needs a `preRender`-method to create a build.',
              instruction: 'Example: `preRender({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
              link: '/dev-toolkit#custom-server',
            });
            const renderPromise = server.preRender({ assets: webpackAssets, buildFolder });
            help({
              displayedWhen: typeof renderPromise.then !== 'function',
              warning: 'The server `preRender`-method must return a Promise to say it\'s finished.',
              instruction: 'Example: `preRender({ assets, buildFolder }) { return new Promise(() => { ... }); }`',
              link: '/dev-toolkit#custom-server',
            });
            renderPromise.then(() => {
              showSuccessMessage();
            }).catch((buildError) => log({ error: buildError }));
          } else {
            showSuccessMessage();
          }
        });
      },
    );
  });
});
