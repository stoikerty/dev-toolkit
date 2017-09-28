/* eslint-disable import/no-dynamic-require, global-require */
import { pathExistsSync } from 'fs-extra';

import { buildFolder, assetsManifestFile } from '../webpack/projectSettings';
import { help, log, bootstrap } from '../utilities';

bootstrap().then(({ server }) => {
  const getWebpackAssets = new Promise((resolve) => {
    if (pathExistsSync(assetsManifestFile)) {
      import(assetsManifestFile).then((json) => {
        resolve({ assets: json });
      }).catch((error) => {
        log({ message: 'Couldn\'t read `assets-manifest.json`', error });
      });
    } else {
      log({ message: '`assets-manifest.json` not found. ' });
      resolve({ assets: {} });
    }
  });

  log({ message: 'Starting your Server App…\n', useSeparator: true });
  try {
    getWebpackAssets.then(({ assets }) => server.start({ assets, buildFolder }));
  } catch (error) {
    help({
      displayedWhen: server && (typeof server.start !== 'function'),
      warning: 'Your server needs a `start`-method.',
      instruction: 'Example: `start({ assets }) { this.express.listen(2000); }`',
      link: '/dev-toolkit#custom-server',
      error,
    });
  }
});
