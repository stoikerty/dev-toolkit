import { pathExistsSync } from 'fs-extra';

import log from '../log';
import help from '../help';
import { serverAppEntryPoint } from '../../webpack/projectSettings';

export default () => new Promise((resolve) => {
  log({ message: 'Importing Server App…' });
  import(serverAppEntryPoint).then((module) => {
    const server = module.default;
    resolve({ server });
  }).catch((error) => {
    help({
      displayedWhen: !pathExistsSync(serverAppEntryPoint),
      warning: 'You need a server app entry point.',
      instruction: 'Do you have the file `src/server/index.js`?',
      link: '/dev-toolkit#custom-server',
      error,
    });
  });
});
