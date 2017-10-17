/* eslint-disable no-underscore-dangle */
import path from 'path';
import babelRunner from 'babel-runner';

import { log } from '../utilities';

export default ({ command, message, options, programmatic }) => {
  // Pass options down to specific command
  global.__devToolkitCommandOptions = options || {};

  // Display message to user, making it clear what's going on
  log({
    title: programmatic ? 'dev-toolkit' : command,
    message: programmatic ? `Running command \`${command}\`` : message,
    useSeparator: true,
  });

  log({ message: 'Adding universal configuration…' });
  try {
    babelRunner({
      fileToRun: path.resolve(__dirname, `../commands/${command}`),
    });
  } catch (error) {
    log({ error });
  }
};
