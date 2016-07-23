console.log('The Javascript Development Toolkit');
var path = require('path');
// process.env.BABEL_DISABLE_CACHE = 0;
// process.env.NODE_PATH = path.resolve(__dirname, process.cwd());

// massive hack
// https://gist.github.com/branneman/8048520
process.env.NODE_PATH = path.resolve(__dirname, process.cwd());
require('module').Module._initPaths();

require('babel-register');
global.toolkitCli = {
  isDev: true,
};
// console.log(process.env);
require('../../dist/development');
