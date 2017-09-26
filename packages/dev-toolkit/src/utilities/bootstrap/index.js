import { pathExistsSync } from 'fs-extra';

import generateSettings from './generateSettings';
import importServerApp from './importServerApp';
import log from '../log';
import { userSettingsPath } from '../../webpack/projectSettings';

export default () => new Promise((resolve) => {
  if (pathExistsSync(userSettingsPath)) {
    log({ message: 'Using settings from `dev-toolkit.config.js`…' });
    import(userSettingsPath).then((module) => {
      // We're expecting a Node.js module here declared with `module.exports`
      const settings = module;

      importServerApp().then(({ server }) => {
        resolve({ server, settings: generateSettings(settings) });
      });
    });
  } else {
    importServerApp().then(({ server }) => {
      resolve({ server, settings: generateSettings() });
    });
  }
});
