'use strict';

// Use require.resolve to prevent issues when using npm link
// see: https://github.com/babel/babel-loader/issues/149

module.exports = {
  plugins: ['jsx-control-statements'],
  extends: ['plugin:jsx-control-statements/recommended'],
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['src/'],
      },
    ],
    'import/no-extraneous-dependencies': ['off'],
    'react/jsx-filename-extension': 0,
    'import/extensions': ['off', 'never'],
    'react/jsx-curly-brace-presence': ['off', 'never'],
    // https://github.com/vkbansal/eslint-plugin-jsx-control-statements#important
    'react/jsx-no-undef': [2, { allowGlobals: true }],
  },
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: { browser: true },
};
