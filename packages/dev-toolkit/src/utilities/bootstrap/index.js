import getUserSettings from './getUserSettings';
import importServerApp from './importServerApp';

export default ({ skipServerImport } = { skipServerImport: false }) => {
  const userSettings = getUserSettings();

  return new Promise((resolve, reject) => {
    if (skipServerImport) {
      resolve({ userSettings });
    } else {
      importServerApp()
        .then(({ server }) => resolve({ server, userSettings }))
        .catch(reject);
    }
  });
};
