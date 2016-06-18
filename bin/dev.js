#!/usr/bin/env node
console.log('Registering Babel for ES2015+ Power');
require('babel-register');

console.log('Running dev script');
require('../toolkit/webpack/development');
