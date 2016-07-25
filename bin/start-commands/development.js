console.log('The Javascript Development Toolkit');
require('babel-register');
global.toolkitCli = {
  isDev: true,
};

require('../../dist/development');
