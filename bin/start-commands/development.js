console.log('Toolkit - Development');
// process.env.BABEL_DISABLE_CACHE = 0;
require('babel-register');
global.toolkitCli = {
  isDev: true,
};
require('../../dist/development');
