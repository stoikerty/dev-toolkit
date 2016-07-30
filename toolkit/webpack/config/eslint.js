import path from 'path';

import {
  isDev,
  rootForRequire,
} from '../../_userSettings';

export default {
  useEslintrc: false,
  configFile: path.resolve(rootForRequire, '.eslintrc'),

  // Override any settings from the configFile
  rules: isDev ? {
    'no-debugger': [
      'warn',
    ],
  } : {},
};
