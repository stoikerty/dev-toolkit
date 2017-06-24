import spawn from 'cross-spawn';
import chalk from 'chalk';
import path from 'path';

import debug from './debug';

export default (options) => {
  console.log(chalk.magenta(`[ ${options.script} ]`), `- ${options.message}\n`);

  const isWin = process.platform === 'win32';
  const currentPath = path.resolve(process.cwd());
  const devToolkitPath = path.resolve(__dirname, 'dev-toolkit.js');

  debug('Platform', process.platform);
  debug('NODE_PATH', process.env.NODE_PATH);
  debug('currentPath', currentPath);
  debug('devToolkitPath', devToolkitPath);
  debug('');

  debug('running Script:', options.script);
  let args = [path.resolve(__dirname, `../scripts/${options.script}.js`)];
  debug('in folder:', args[0]);

  debug('...with options:', options);
  debug('...with arguments:', options.args);
  args = args.concat(options.args);

  // Add color support for dependency-modules like `chalk`
  args.push('--color');

  debug(chalk.magenta('---'));

  // Forward all environment variables to `spawn` so they can be used within the toolkit
  const spawnEnv = process.env;

  // Fixes `spawn node ENOENT` error by always transferring PATH
  // http://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
  spawnEnv.PATH = process.env.PATH;

  // Toolkit-related env variables
  spawnEnv.TOOLKIT_DEBUG = process.env.TOOLKIT_DEBUG;

  // Make sure node knows about root-relative imports by giving setting the current path
  spawnEnv.NODE_PATH = currentPath;

  // spawn & NODE_PATH is required for root-relative imports to work in server-rendering, because
  // webpack's alias is not picked up in node. For other solutions, see the following:
  // https://gist.github.com/branneman/8048520
  // https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
  spawn(
    'node',
    args,
    {
      env: spawnEnv,

      // OSX will throw error if shell is not set
      shell: !isWin,
      stdio: 'inherit',
    },
  );
};
