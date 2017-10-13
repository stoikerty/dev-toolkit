import { pathExistsSync } from 'fs-extra';

import generateSettings from './generateSettings';
import defineGlobalDevToolkitSettings from './defineGlobalDevToolkitSettings';
import importServerApp from './importServerApp';
import log from '../log';
import { userSettingsPath } from '../../webpack/projectSettings';

export default ({ skipServerImport } = { skipServerImport: false }) =>
  new Promise(resolve => {
    if (pathExistsSync(userSettingsPath)) {
      log({ message: 'Using settings from `dev-toolkit.config.js`…' });
      import(userSettingsPath).then(module => {
        // We're expecting a classic Node.js module declared with `module.exports`
        const userSettings = generateSettings(module);
        defineGlobalDevToolkitSettings({ settings: userSettings.devToolkit });

        if (!skipServerImport) {
          importServerApp().then(({ server }) => resolve({ server, userSettings }));
        } else {
          resolve({ userSettings });
        }
      });
    } else {
      const userSettings = generateSettings();
      defineGlobalDevToolkitSettings({ settings: userSettings.devToolkit });

      if (!skipServerImport) {
        importServerApp().then(({ server }) => resolve({ server, userSettings }));
      } else {
        resolve({ userSettings });
      }
    }
  });
