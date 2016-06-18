#!/usr/bin/env node
console.log('Registering Babel for ES2015+ Power');
require('babel-register');

global.toolkitCli = {
  isDev: true,
};

console.log('Running dev script');
require('../toolkit/webpack/development');
