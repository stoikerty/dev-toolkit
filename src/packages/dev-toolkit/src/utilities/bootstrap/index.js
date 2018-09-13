import getUserSettings from './getUserSettings';
import importServerApp from './importServerApp';
import createEmptyServerApp from './createEmptyServerApp';

export default ({ skipServerImport } = { skipServerImport: false }) => {
  const userSettings = getUserSettings();

  return new Promise((resolve, reject) => {
    if (skipServerImport) {
      resolve({ userSettings });
    } else {
      const { preRenderEntryPoint } = global.__devToolkitCommandOptions;
      if (preRenderEntryPoint) {
        createEmptyServerApp({ preRenderEntryPoint })
          .then(({ server }) => resolve({ server, userSettings }))
          .catch(reject);
      } else {
        importServerApp()
          .then(({ server }) => resolve({ server, userSettings }))
          .catch(reject);
      }
    }
  });
};
