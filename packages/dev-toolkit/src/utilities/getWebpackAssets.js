import { pathExistsSync } from 'fs-extra';

import log from './log';
import { assetsManifestFile } from '../webpack/projectSettings';

export default () => new Promise((resolve) => {
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
