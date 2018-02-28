import { pathExistsSync } from 'fs-extra';

import log from '../log';
import { userSettingsPath } from '../../webpack/projectSettings';
import defineGlobalDevToolkitSettings from './defineGlobalDevToolkitSettings';
import extractedSharedEnvs from './extractedSharedEnvs';

export default () => {
  // 1) Get User settings from a specified file
  // ----
  const settingsExist = pathExistsSync(userSettingsPath);
  if (settingsExist) log({ message: 'Using settings from `dev-toolkit.config.js`' });
  // We're expecting a classic Node.js module declared with `module.exports`
  // NOTE: Using `require` here is necessary so that using settings with an import like
  //       `import { sharedEnvs} from 'dev-toolkit/settings'` doesn't become an async dependency
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const userSettings = settingsExist ? require(userSettingsPath) : {};

  // 2) Format settings & generate a safe final version for consumption via node and webpack
  // ----
  const webpack = userSettings.webpack || {};
  const devToolkit = userSettings.devToolkit || {};
  const sharedEnvs = {
    // extract only explicitly declared environment variables from `process.env`
    ...extractedSharedEnvs({
      withEnvs:
        devToolkit.sharedEnvs && Array.isArray(devToolkit.sharedEnvs) ? devToolkit.sharedEnvs : [],
      fromEnvs: process.env,
    }),
    // make NODE_ENV always available
    NODE_ENV: process.env.NODE_ENV,
  };
  const finalSettings = {
    webpack: {
      rules:
        webpack.rules && typeof webpack.rules === 'function' ? webpack.rules : () => [],
      plugins:
        webpack.plugins && typeof webpack.plugins === 'function' ? webpack.plugins : () => [],
      customize:
        webpack.customize && typeof webpack.customize === 'function'
          ? webpack.customize
          : config => config,
    },
    devToolkit: {
      usePreRender: typeof devToolkit.usePreRender === 'boolean' ? devToolkit.usePreRender : true,
      sharedEnvs,
    },
  };

  // 3) Define settings in Node so we can use `dev-toolkit/settings` both on the client & server
  // ----
  defineGlobalDevToolkitSettings({ settings: finalSettings.devToolkit });
  return finalSettings;
};
