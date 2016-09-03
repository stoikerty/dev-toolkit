import {
  currentScript,
} from '../../../_userSettings';

// Ignore custom import temporarily so text-editors work with `eslint-plugin-import`
// see: https://github.com/AtomLinter/linter-eslint/issues/610
const sharedRules = {
  'import/no-unresolved': [
    'error',
    {
      ignore: ['src/'],
    },
  ],
};

export default {
  // Override any settings from the configFile
  rules: currentScript === 'watch' ? {
    // only warn for debugging statements while developing
    'no-debugger': [
      'warn',
    ],

    ...sharedRules,
  } : { ...sharedRules },
};
