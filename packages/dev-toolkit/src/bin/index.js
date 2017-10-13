#!/usr/bin/env node
/* eslint-disable no-underscore-dangle */
import yargs from 'yargs';
import path from 'path';
import babelRunner from 'babel-runner';

import { log } from '../utilities';

const runCommand = ({ command, message, options }) => {
  // Pass options down to specific command
  global.__devToolkitCommandOptions = options;

  log({ title: command, message, useSeparator: true });

  // Run a given command
  if (command === 'run') {
    // `run` uses `babelRunner`, we import it directly so `babelRunner` doesn't run twice
    import(path.resolve(__dirname, '../commands/run'));
  } else {
    babelRunner({
      fileToRun: path.resolve(__dirname, `../commands/${command}`),
    });
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
      handler: argv =>
        runCommand({
          options: {
            silent: argv.silent || false,
            fileName: argv._[1] || '',
          },
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
