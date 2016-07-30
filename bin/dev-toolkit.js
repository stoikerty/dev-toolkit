#!/usr/bin/env node
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const argv = require('yargs')
  .alias('i', 'init')
  .alias('d', 'debug').argv;
const pkg = require('../package.json');
const debug = require('./utils/debug');

// Notify of debug mode
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
  debug('NODE_PATH', process.env.NODE_PATH);
  debug('currentPath', currentPath);
  debug('devToolkitPath', devToolkitPath);
  debug('');

  debug('running Script:', options.script);
  var args = [ path.resolve(__dirname, 'scripts/' + options.script + '.js') ];

  debug('...with arguments:', options.args);
  args = args.concat(options.args);

  // Add color support for dependency-modules like `chalk`
  args.push('--color');

  // spawn is required for root-relative imports to work in server-rendering, because webpack's
  // alias is not picked up in node. For other solutions, see the following:
  // https://gist.github.com/branneman/8048520
  // https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
  spawn(
    'node',
    args,
    {
      env: {
        NODE_PATH: currentPath,
      },

      // OSX will throw error if shell is not set
      shell: !isWin,
      stdio: 'inherit',
    }
  );


  if (argv.debug) {
    console.log('0.4 NODE_PATH after: ', process.env.NODE_PATH);
  }
}

if (argv.version) {
  console.log('[', pkg.name, pkg.version, ']');
} else {
  if (argv.init) {
    run({ script: 'init', args: [argv.init] });
  // if (argv.build) {
  //   run({ script: 'build', args: [argv.build] });
  // if (argv.test) {
  //   run({ script: 'test', args: [argv.test] });
  // if (argv.eject) {
  //   run({ script: 'eject', args: [argv.eject] });
  } else {
    run({ script: 'development', args: [] });
  }
}
