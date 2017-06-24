#!/usr/bin/env node
import yargs from 'yargs';
import chalk from 'chalk';

import debug from './utils/debug';
import runCommandWithSpawn from './utils/runCommandWithSpawn';
import pkg from '../../package.json';

const argv = yargs.alias('w', 'watch')
  .alias('b', 'build')
  .alias('i', 'init')
  .alias('s', 'serve')
  .alias('static', 'serve-static')
  .alias('d', 'debug').argv;

// Enables debugging messages
if (argv.debug) {
  process.env.TOOLKIT_DEBUG = true;
  console.log(chalk.magenta('DEBUG MODE'));
} else {
  process.env.TOOLKIT_DEBUG = false;
}

// Outputs current version number from `package.json`
if (argv.v || argv.version) {
  console.log(`[${chalk.magenta(`${pkg.name} v${pkg.version}`)}]`);
}

debug('Toolkit Version', pkg.version);
debug('given arguments', argv);

// runs corresponding script inside `./scripts`-folder
if (argv.watch) {
  runCommandWithSpawn({
    script: 'watch',
    message: 'Watching files for development',
    args: [argv.watch],
  });
}
if (argv.serve) {
  runCommandWithSpawn({
    script: 'serve',
    message: 'Watching files for development',
    args: [argv.serve],
  });
}
if (argv['serve-static']) {
  console.log(chalk.magenta('NOTE:'), 'This command is not meant for production use.');
  runCommandWithSpawn({
    script: 'serveStatic',
    message: 'Serving the /build folder using a minimal server',
    args: [argv['serve-static']],
  });
}
if (argv.init) {
  runCommandWithSpawn({
    script: 'init',
    message: 'Initializing new project',
    args: [argv.init],
  });
}
if (argv.build) {
  runCommandWithSpawn({
    script: 'build',
    message: `Creating a static build${(argv.dynamic ? ' with dynamic pages' : '')}`,
    args: [(argv.dynamic ? 'dynamic' : '')],
  });
}
