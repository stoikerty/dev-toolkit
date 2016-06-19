#!/usr/bin/env node
console.log('Toolkit - Production');
// process.env.BABEL_DISABLE_CACHE = 0;
require('babel-register');
global.toolkitCli = {
  isDev: false,
};
require('../dist/production');
