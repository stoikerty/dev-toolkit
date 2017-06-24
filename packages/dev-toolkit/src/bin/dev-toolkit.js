#!/usr/bin/env node
/* eslint-disable no-console */
import yargs from 'yargs';
import chalk from 'chalk';

import debug from './utils/debug';
import runCommandWithSpawn from './utils/runCommandWithSpawn';
import pkg from '../../package.json';

const devToolkit = ({ cmdArgs, runCommand }) => {
  const processedArgs = yargs
    .alias('d', 'debug')
    .alias('w', 'watch')
    .alias('b', 'build')
    .alias('i', 'init')
    .alias('s', 'serve')
    .alias('static', 'serve-static')
    .parse(cmdArgs);

  // Enables debugging messages
  if (processedArgs.debug) {
    process.env.TOOLKIT_DEBUG = true;
    console.log(chalk.magenta('DEBUG MODE'));
  } else {
    process.env.TOOLKIT_DEBUG = false;
  }

  // Outputs current version number from `package.json`
  if (processedArgs.v || processedArgs.version) {
    console.log(`[${chalk.magenta(`${pkg.name} v${pkg.version}`)}]`);
  }

  debug('Toolkit Version', pkg.version);
  debug('given arguments', processedArgs);

  // runs corresponding script inside `./scripts`-folder
  if (processedArgs.watch) {
    runCommand({
      script: 'watch',
      message: 'Watching files for development',
      args: [processedArgs.watch],
    });
  }
  if (processedArgs.serve) {
    runCommand({
      script: 'serve',
      message: 'Watching files for development',
      args: [processedArgs.serve],
    });
  }
  if (processedArgs['serve-static']) {
    console.log(chalk.magenta('NOTE:'), 'This command is not meant for production use.');
    runCommand({
      script: 'serveStatic',
      message: 'Serving the /build folder using a minimal server',
      args: [processedArgs['serve-static']],
    });
  }
  if (processedArgs.init) {
    runCommand({
      script: 'init',
      message: 'Initializing new project',
      args: [processedArgs.init],
    });
  }
  if (processedArgs.build) {
    runCommand({
      script: 'build',
      message: `Creating a static build${(processedArgs.dynamic ? ' with dynamic pages' : '')}`,
      args: [(processedArgs.dynamic ? 'dynamic' : '')],
    });
  }
};

// Run toolkit immediately using yargs if we're not testing it
if (!process.env.TOOLKIT_TEST) {
  devToolkit({ cmdArgs: process.argv, runCommand: runCommandWithSpawn });
}

export default devToolkit;
