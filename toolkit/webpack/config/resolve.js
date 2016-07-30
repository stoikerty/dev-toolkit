import path from 'path';

import {
  rootForProject,
  rootForRequire,
  rootForToolkit,
} from '../../_userSettings';

// Files in these directories can be imported without a relative path
export default {
  extensions: ['', '.js', '.jsx'],
  root: path.resolve(__dirname, rootForRequire),
  // the alias will allow us to get files relative to the `src`-folder
  // exmaple: `import { myUtil } from 'src/client/utils';`
  alias: {
    src: 'src',
  },

  modulesDirectories: [
    path.resolve(rootForProject, 'node_modules'),
    path.resolve(rootForToolkit, 'node_modules'),
  ],
};
