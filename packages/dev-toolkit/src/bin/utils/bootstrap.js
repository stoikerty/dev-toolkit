import chalk from 'chalk';
// import jsxHook from 'node-jsx-babel';

import debug from '../../utilities/debug';
import babelConfig from '../../babelrc';

export default () =>
  new Promise((resolve) => {
    // Set up server-side rendering for jsx-files
    // NOTE:
    //   This statement is here due to a race-condition. It needs to be called
    //   before `babel-register`, otherwise it would be in `...config/loaders.js`
    // jsxHook.install();

    // register any future files to run with specified babel-config
    import('babel-core/register').then((module) => {
      module(babelConfig);

      global.toolkitCli = {
        isDev: true,
      };

      debug('NODE_PATH', process.env.NODE_PATH);
      debug(chalk.magenta('---'));

      resolve();
    });
  });
