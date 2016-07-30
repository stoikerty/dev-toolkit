#!/usr/bin/env node
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const argv = require('yargs')
  .alias('i', 'init')
  .alias('d', 'debug').argv;
const pkg = require('../package.json');
const debug = require('./utils/debug');

if (argv.debug) {
  process.env.TOOLKIT_DEBUG = true;
  console.log(chalk.magenta.underline('DEBUG MODE'));
}

function run(options) {
  const isWin = process.platform === 'win32';
  const currentPath = path.resolve(process.cwd());
  const devToolkitPath = path.resolve(__dirname, 'dev-toolkit.js');

  debug('Toolkit Version', pkg.version);
  debug('Platform', process.platform);
  debug('running Script', options.script);
  debug('NODE_PATH', process.env.NODE_PATH);
  debug('currentPath', currentPath);
  debug('devToolkitPath', devToolkitPath);

  if (argv.debug) {
    console.log('0.4 NODE_PATH after: ', process.env.NODE_PATH);
  }

  // Required for root-relative imports to work in server-rendering because webpack's alias
  // is not picked up in node. For other solutions, see the following.
  // https://gist.github.com/branneman/8048520
  // https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
  // spawn(
  //   'node',
  //   // Add color support for dependency-modules like `chalk`
  //   [devToolkitPath, '--color'],
  //   {
  //     env: {
  //       NODE_PATH: currentPath,
  //     },
  //     shell: !isWin,
  //     stdio: 'inherit',
  //   }
  // );

  console.log(options);

  // require('./start-commands/' + command);
}

if (argv.version) {
  console.log('[', pkg.name, pkg.version, ']');
} else {
  const command = process.argv[2];
  switch (command) {
    case 'init':
      run({ script: command, arguments: { init: argv.init, debug: argv.debug } });
      break;
    default:
      run({ script: 'development', arguments: { debug: argv.debug } });
      break;
  }
}
