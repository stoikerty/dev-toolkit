#!/usr/bin/env node
import yargs from 'yargs';
import babelRunner from 'babel-runner';

import { log } from '../utilities';

const runCommand = ({ command, message, options }) => {
  log({ title: command, message, useSeparator: true });

  if (command === 'run') {
    // TODO: pass filename into babel runner
    babelRunner();
  } else {
    process.env.DEV_TOOLKIT_COMMAND = command;
    global.options = options;
    require('./bootstrap');

    // spawn(
    //   'node',
    //   [
    //     // Run dev-toolkit command via bootstrapped node environment
    //     path.resolve(__dirname, 'bootstrap.js'),
    //     // We append any existing arguments to run the command with
    //     [JSON.stringify(options)],
    //     // And add color support for dependency-modules like `chalk`
    //     '--color',
    //   ],
    //   {
    //     env: {
    //       // Transfer existing environment variables to called command
    //       ...process.env,

    //       // Toolkit-related environment variables
    //       DEV_TOOLKIT_COMMAND: command,

    //       // Make sure node knows about root-relative imports by giving setting the current path
    //       // NODE_PATH: path.resolve(process.cwd()),
    //     },

    //     // OSX will throw error if shell is not set
    //     shell: process.platform !== 'win32',
    //     stdio: 'inherit',
    //   },
    // );
  }
};

const devToolkit = ({ cmdArgs }) => {
  // eslint-disable-next-line no-unused-expressions
  yargs
    .usage('\nUsage: dev-toolkit <command> [options]')
    .command({
      command: 'init',
      aliases: ['init', 'i'],
      desc: 'Initializes a new project',
      handler: argv =>
        runCommand({
          argv,
          options: {
            projectName: argv._[1],
            template: argv.template || false,
            silent: argv.silent || false,
            skipComments: argv.skipComments || argv['skip-comments'] || false,
          },
          command: 'init',
          message: 'Initializing a new project',
        }),
    })
    .command({
      command: 'build',
      aliases: ['build', 'b'],
      desc: 'Generates a static build',
      handler: argv =>
        runCommand({
          options: {
            silent: argv.silent || false,
            skipPreRender:
              argv.skipPreRender || argv['skip-prerender'] || argv['skip-pre-render'] || false,
          },
          command: 'build',
          message: 'Generating a static build',
        }),
    })
    .command({
      command: 'version',
      aliases: ['version', 'v', '-v'],
      desc: 'Outputs current version number',
      handler: () =>
        runCommand({
          options: {},
          command: 'version',
          message: 'Output current version number',
        }),
    })
    .command({
      command: 'watch',
      aliases: ['watch', 'w'],
      desc: 'Watches files for development',
      handler: argv =>
        runCommand({
          options: {
            silent: argv.silent || false,
          },
          command: 'watch',
          message: 'Watching files for development',
        }),
    })
    .command({
      command: 'serve',
      aliases: ['serve', 's'],
      desc: 'Serves the app',
      handler: argv =>
        runCommand({
          options: {
            silent: argv.silent || false,
          },
          command: 'serve',
          message: 'Serving app with `start`-method',
        }),
    })
    .command({
      command: 'preRender',
      aliases: ['preRender', 'p'],
      desc: 'preRender the app',
      handler: argv =>
        runCommand({
          options: {
            silent: argv.silent || false,
          },
          command: 'preRender',
          message: 'Pre-rendering app with `preRender`-method',
        }),
    })
    .command({
      command: 'run',
      aliases: ['run', 'r'],
      desc: 'Runs a file with defined babel & nodeHooks configuration',
      handler: () =>
        runCommand({
          options: {},
          command: 'run',
          message: 'Run file with universal configuration',
        }),
    })
    .help().argv;

  yargs.parse(cmdArgs);
};

// Run toolkit immediately using yargs if we're not testing it
if (!process.env.TOOLKIT_TEST) {
  devToolkit({ cmdArgs: process.argv });
}

export default devToolkit;
