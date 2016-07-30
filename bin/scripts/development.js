const debug = require('../utils/debug');
const chalk = require('chalk');
const path = require('path');

const babelConfig = require(path.resolve(__dirname, '../../babelrc.js'));

console.log(chalk.blue('~ Javascript Development Toolkit ~'));
require('babel-register')(babelConfig);
global.toolkitCli = {
  isDev: true,
};

debug('NODE_PATH', process.env.NODE_PATH);
debug(chalk.magenta.underline('---'));
require('../../dist/development');
