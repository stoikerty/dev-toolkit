/* eslint-disable no-underscore-dangle */
import path from 'path';
import babelRunner from 'babel-runner';

import { log } from '../../utilities';

export default ({ command, envs, options }) => {
  log({
    title: 'programmatic-usage',
    message: `Running command \`${command}\``,
    useSeparator: true,
  });

  // Set environment variables programmatically
  Object.keys(envs).map(key => {
    process.env[key] = envs[key];
    return null;
  });

  // Pass options down to specific command
  global.__devToolkitCommandOptions = options;

  babelRunner({
    fileToRun: path.resolve(__dirname, `../commands/${command}`),
  });
};
