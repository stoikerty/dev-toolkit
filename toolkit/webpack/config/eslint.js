import path from 'path';

import {
  currentScript,
  rootForRequire,
} from '../../_userSettings';

export default {
  useEslintrc: false,
  configFile: path.resolve(rootForRequire, '.eslintrc'),

  // Override any settings from the configFile
  rules: currentScript === 'watch' ? {
    // only warn for debugging statements while developing
    'no-debugger': [
      'warn',
    ],
  } : {},
};
