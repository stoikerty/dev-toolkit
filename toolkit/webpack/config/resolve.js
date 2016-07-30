import path from 'path';

import {
  rootForRequire,
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
    'node_modules',
  ],
};
