import spawn from 'cross-spawn';
import chalk from 'chalk';
import path from 'path';

import debug from '../../utilities/debug';

export default ({ script, message, args }) => {
  const isWin = process.platform === 'win32';
  const currentPath = path.resolve(process.cwd());
  const devToolkitPath = path.resolve(__dirname, 'dev-toolkit.js');
  const scriptToCall = path.resolve(__dirname, `../scripts/${script}.js`);

  // Forward all environment variables to `spawn` so they can be used within the toolkit
  const spawnEnv = {
    // Fixes `spawn node ENOENT` by always transferring `process.env.PATH`, transfer the rest too
    // http://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
    ...process.env,

    // Toolkit-related env variables
    TOOLKIT_DEBUG: process.env.TOOLKIT_DEBUG,

    // Make sure node knows about root-relative imports by giving setting the current path
    NODE_PATH: currentPath,

    // NOTE:
    // spawn & NODE_PATH is required for root-relative imports to work in server-rendering, because
    // webpack's alias is not picked up in node. For other solutions, see the following:
    // https://gist.github.com/branneman/8048520
    // https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
  };

  debug('Platform', process.platform);
  debug('NODE_PATH before', process.env.NODE_PATH);
  debug('NODE_PATH after', spawnEnv.NODE_PATH);
  debug('currentPath', currentPath);
  debug('devToolkitPath', devToolkitPath);
  debug('');
  debug('running Script:', script);
  debug('using file:', scriptToCall);
  debug('...with options:', { script, message, args });
  debug('...with arguments:', args);
  debug(chalk.magenta('---'));

  console.log('\n', chalk.magenta(`[ ${script} ]`), `- ${message}\n`);
  spawn(
    'node',
    [
      // spawn needs to know our script
      scriptToCall,
      // we append any existing arguments to run the script with
      ...args,
      // and add color support for dependency-modules like `chalk`
      '--color',
    ],
    {
      env: spawnEnv,

      // OSX will throw error if shell is not set
      shell: !isWin,
      stdio: 'inherit',
    },
  );
};
