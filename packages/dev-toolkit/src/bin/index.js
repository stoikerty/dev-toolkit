#!/usr/bin/env node
import yargs from 'yargs';

import { runCommand } from '../utilities';

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
            programmatic: false,
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
            programmatic: false,
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
          options: {
            programmatic: false,
          },
          command: 'version',
          message: 'Output current version number',
          skipPrimaryLog: true,
        }),
    })
    .command({
      command: 'watch',
      aliases: ['watch', 'w'],
      desc: 'Watches files for development',
      handler: argv =>
        runCommand({
          options: {
            programmatic: false,
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
            programmatic: false,
            silent: argv.silent || false,
          },
          command: 'serve',
          message: 'Serving app with `start`-method',
        }),
    })
    .command({
      command: 'preRender',
      aliases: ['preRender', 'prerender', 'pre-render', 'p'],
      desc: 'preRender the app',
      handler: argv =>
        runCommand({
          options: {
            programmatic: false,
            silent: argv.silent || false,
          },
          command: 'preRender',
          message: 'Pre-rendering app with `preRender`-method',
        }),
    })
    .command({
      command: 'bootstrap',
      aliases: ['bootstrap'],
      desc:
        'Bootstraps a file with defined babel & nodeHooks configuration and makes dev-toolkit settings available for import',
      handler: argv =>
        runCommand({
          options: {
            programmatic: false,
            silent: argv.silent || false,
            file: argv.file || '',
          },
          command: 'bootstrap',
          message: 'Bootstrap with universal configuration & dev-toolkit settings',
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
