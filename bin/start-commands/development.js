console.log('The Javascript Development Toolkit');
// process.env.BABEL_DISABLE_CACHE = 0;
require('babel-register');
global.toolkitCli = {
  isDev: true,
};
require('../../dist/development');
