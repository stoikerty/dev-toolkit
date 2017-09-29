import webpack from 'webpack';
import { emptyDir } from 'fs-extra';

import { buildFolder } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { log, bootstrap, preRender } from '../utilities';

bootstrap().then(({ server, userSettings }) => {
  const showSuccessMessage = () => log({ message: '\n⭐️  Your build is ready ⭐️\n', type: 'success' });

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

          if (userSettings.devToolkit.usePreRender) {
            preRender({ server, webpackAssets, buildFolder })
              .then(showSuccessMessage);
          } else {
            showSuccessMessage();
          }
        });
      },
    );
  });
});
