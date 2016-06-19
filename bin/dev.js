#!/usr/bin/env node
console.log('Registering Babel for ES2015+ Power');
process.env.BABEL_DISABLE_CACHE = 0;
require('babel-register')({
  // ignore: false,
  // only: /universal-dev-toolkit\/toolkit/,
  // presets: [
  //   'es2015',
  //   'stage-1',
  //   'react',
  // ],
  // plugins: [
  //   'jsx-control-statements',
  //   'transform-class-properties',
  // ],
});

global.toolkitCli = {
  isDev: true,
};
var path = require('path');
console.log('Running dev script');
require('../dist/webpack/development');
// require(path.join(process.cwd(), '/src/server/app')).default;
