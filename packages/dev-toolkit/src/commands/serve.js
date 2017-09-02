/* eslint-disable import/no-dynamic-require, global-require */
import { pathExistsSync } from 'fs-extra';

import { serverAppEntryPoint, buildFolder, assetsManifestFile } from '../webpack/projectSettings';
import { help, log } from '../utilities';

log({ message: 'Importing Server App…' });

import(serverAppEntryPoint).then((module) => {
  const server = module.default;
  // We tell express to serve from build folder when used without webpack
  server.use(server.static(buildFolder));

  const webpackAssets = () => {
    if (pathExistsSync(assetsManifestFile)) {
      // read manifest file
      return {};
    }

    return {};
  };

  log({ message: 'Starting your Server App…\n', useSeparator: true });
  try {
    server.start({ assets: webpackAssets });
  } catch (error) {
    help({
      displayedWhen: server && (typeof server.start !== 'function'),
      warning: 'Your server needs a `start`-method.',
      instruction: 'Example: `start({ generatedAssets }) { this.express.listen(2000); }`',
      link: '/dev-toolkit#custom-server',
      error,
    });
  }
});
