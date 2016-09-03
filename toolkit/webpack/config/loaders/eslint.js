import {
  currentScript,
  PATHS,
} from '../../../_userSettings';

export default {
  useEslintrc: false,
  configFile: PATHS.eslintProjectConfig,

  // Override any settings from the configFile
  rules: currentScript === 'watch' ? {
    // only warn for debugging statements while developing
    'no-debugger': [
      'warn',
    ],
  } : {},
};
