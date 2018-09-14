/* eslint-disable no-underscore-dangle */
import { pathExistsSync } from 'fs-extra';

import log from '../log';
import help from '../help';

export default ({ preRenderEntryPoint }) =>
  new Promise(resolve => {
    const entryPoint = `${preRenderEntryPoint}.js`;
    log({ message: 'Importing Entry Point…' });
    import(entryPoint)
      .then(module => {
        resolve({ server: { preRender: module.default } });
      })
      .catch(error => {
        help({
          displayedWhen: !pathExistsSync(entryPoint),
          warning: 'You need to specify a valid entry point. (using an absolute path)',
          instruction: `Does the file you specified exist? \`${entryPoint}\`?`,
          link: '/dev-toolkit#serverless-render',
          error,
        });
      });
  });
