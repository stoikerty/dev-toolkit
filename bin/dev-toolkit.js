#!/usr/bin/env node
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const argv = require('yargs')
  .alias('w', 'watch')
  .alias('i', 'init')
  .alias('d', 'debug').argv;
const pkg = require('../package.json');

// Enables debugging messages
if (argv.debug) {
  process.env.TOOLKIT_DEBUG = true;
  console.log(chalk.magenta.underline('DEBUG MODE'));
} else {
  process.env.TOOLKIT_DEBUG = false;
}

// Outputs current version number from `package.json`
if (argv.v || argv.version) {
  console.log('[', chalk.magenta.underline(pkg.name + ' v' + pkg.version), ']');
}

const debug = require('./utils/debug');

// runs corresponding script inside `./scripts`-folder
function run(options) {
  console.log(chalk.magenta.underline('[ ' + options.script + ' ]'), '- ' + options.message + '\n');

  const isWin = process.platform === 'win32';
  const currentPath = path.resolve(process.cwd());
  const devToolkitPath = path.resolve(__dirname, 'dev-toolkit.js');

  debug('Toolkit Version', pkg.version);
  debug('Platform', process.platform);
  debug('NODE_PATH', process.env.NODE_PATH);
  debug('currentPath', currentPath);
  debug('devToolkitPath', devToolkitPath);
  debug('given arguments', argv);
  debug('');

  debug('running Script:', options.script);
  var args = [ path.resolve(__dirname, 'scripts/' + options.script + '.js') ];

  debug('...with options:', options);
  debug('...with arguments:', options.args);
  args = args.concat(options.args);

  // Add color support for dependency-modules like `chalk`
  args.push('--color');

  debug(chalk.magenta.underline('---'));

  // spawn is required for root-relative imports to work in server-rendering, because webpack's
  // alias is not picked up in node. For other solutions, see the following:
  // https://gist.github.com/branneman/8048520
  // https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
  spawn(
    'node',
    args,
    {
      env: {
        // Fixes `spawn node ENOENT` error by transferring PATH
        // http://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
        PATH: process.env.PATH,

        NODE_PATH: currentPath,
        TOOLKIT_DEBUG: process.env.TOOLKIT_DEBUG,
      },

      // OSX will throw error if shell is not set
      shell: !isWin,
      stdio: 'inherit',
    }
  );
}

if (argv.watch) {
  run({
    script: 'watch',
    message: 'Watching files for development',
    args: [argv.watch],
  });
}
// if (argv.i || argv.init || (argv._[0] === 'init')) {
if (argv.init) {
  run({
    script: 'init',
    message: 'Initializing new project',
    args: [argv.init],
  });
}
if (argv.build) {
  run({
    script: 'build',
    message: 'Creating a static build',
    args: [argv.build],
  });
}
