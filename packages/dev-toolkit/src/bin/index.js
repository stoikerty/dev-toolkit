#!/usr/bin/env node
import yargs from 'yargs';
import spawn from 'cross-spawn';
import path from 'path';
import babelRunner from 'babel-runner';

import { log } from '../utilities';

const runCommand = ({ command, message, args }) => {
  log({ title: command, message, useSeparator: true });
  if (command === 'run') {
    // TODO: pass filename into babel runner
    babelRunner();
  } else {
    spawn(
      'node',
      [
        // Run dev-toolkit command via bootstrapped node environment
        path.resolve(__dirname, 'bootstrap.js'),
        // We append any existing arguments to run the command with
        ...args || [],
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
      handler: () => (runCommand({
        command: 'build',
        message: 'Generating a static build',
      })),
    })

    .command({
      command: 'version',
      aliases: ['version', 'v'],
      desc: 'Outputs current version number',
      handler: () => (runCommand({
        command: 'version',
        message: 'Output current version number',
      })),
    })

    .command({
      command: 'watch',
      aliases: ['watch', 'w'],
      desc: 'Watches files for development',
      handler: () => (runCommand({
        command: 'watch',
        message: 'Watching files for development',
      })),
    })

    .command({
      command: 'run',
      aliases: ['run', 'r'],
      desc: 'Runs a file with defined babel & nodeHooks configuration',
      handler: () => (runCommand({
        command: 'run',
        message: 'Run file with universal configuration',
      })),
    })

    .help()
    .argv;

  yargs.parse(cmdArgs);
};

// Run toolkit immediately using yargs if we're not testing it
if (!process.env.TOOLKIT_TEST) {
  devToolkit({ cmdArgs: process.argv });
}

export default devToolkit;
