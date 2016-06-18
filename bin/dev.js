#!/usr/bin/env node
console.log('Registering Babel for ES2015+ Power');
require('babel-register')({
  'presets': [
    'es2015',
    'stage-1',
    'react',
  ],
  'plugins': [
    'jsx-control-statements',
    'transform-class-properties',
  ]
});

global.toolkitCli = {
  isDev: true,
};

console.log('Running dev script');
require('../toolkit/webpack/development');
