#!/usr/bin/env node
import yargs from 'yargs';
import spawn from 'cross-spawn';
import path from 'path';
import babelRunner from 'babel-runner';

import { log } from '../utilities';

const runCommand = ({ command, message, args }) => {
  if (command === 'run') {
    babelRunner();
  } else {
    log({ title: command, message, useSeparator: true });
    spawn(
      'node',
      [
        // Run dev-toolkit command via bootstrapped node environment
        path.resolve(__dirname, 'bootstrap.js'),
        // We append any existing arguments to run the command with
        ...args,
        // And add color support for dependency-modules like `chalk`
        '--color',
      ],
      {
        env: {
          // Transfer existing environment variables to called command
          ...process.env,

          // Toolkit-related environment variables
          TOOLKIT_COMMAND: command,

          // Make sure node knows about root-relative imports by giving setting the current path
          // NODE_PATH: path.resolve(process.cwd()),
        },

        // OSX will throw error if shell is not set
        shell: process.platform !== 'win32',
        stdio: 'inherit',
      },
    );
  }
};

const devToolkit = ({ cmdArgs }) => {
  yargs
    .usage('\nUsage: dev-toolkit <command> [options]')

    .command({
      command: 'build',
      aliases: ['build', 'b'],
      desc: 'Generates a static build',
      handler: (argv) => (runCommand({
        command: 'build',
        message: 'Generating a static build',
        argv,
      })),
    })

    .command({
      command: 'version',
      aliases: ['version', 'v'],
      desc: 'Outputs current version number',
      handler: (argv) => (runCommand({
        command: 'version',
        message: 'Output current version number',
        argv,
      })),
    })

    .command({
      command: 'watch',
      aliases: ['watch', 'w'],
      desc: 'Watches files for development',
      handler: (argv) => (runCommand({
        command: 'watch',
        message: 'Watching files for development',
        argv,
      })),
    })

    .help()
    .argv;

    // .alias('b', 'build')
    // .alias('i', 'init')
    // .alias('s', 'serve')
    // .alias('v', 'version')
    // .alias('w', 'watch')
    // .alias('r', 'run')
  yargs
    .parse(cmdArgs);

  // Runs corresponding command inside `src/commands`-folder
  // if (processedArgs.build) {
  //   runCommand({
  //     command: 'build',
  //     message: 'Creating a static build',
  //     args: [processedArgs],
  //   });
  // }
  // if (processedArgs.init) {
  //   runCommand({
  //     command: 'init',
  //     message: 'Initializing new project',
  //     args: [processedArgs.init],
  //   });
  // }
  // if (processedArgs.serve) {
  //   runCommand({
  //     command: 'serve',
  //     message: 'Watching files for development',
  //     args: [processedArgs.serve],
  //   });
  // }
  // if (processedArgs.version) {
  //   runCommand({
  //     command: 'version',
  //     message: 'Output current version number',
  //     args: [processedArgs.version],
  //   });
  // }
  // if (processedArgs.watch) {
  //   runCommand({
  //     command: 'watch',
  //     message: 'Watching files for development',
  //     args: [processedArgs.watch],
  //   });
  // }
  // if (processedArgs.run) {
  //   runCommand({
  //     command: 'run',
  //     args: [processedArgs.run],
  //   });
  // }
};

// Run toolkit immediately using yargs if we're not testing it
if (!process.env.TOOLKIT_TEST) {
  devToolkit({ cmdArgs: process.argv });
}

export default devToolkit;
