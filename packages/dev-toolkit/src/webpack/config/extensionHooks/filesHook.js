import filesHook from 'files-require-hook';

import {
  rootForRequire,
} from '../../../_userSettings';

// Set up server-side rendering of image files
// ---
// Implement a hook that uses a file-path for node
// NOTE:
//   For the build-process it is likely that the files should first
//   be copied into the build dir and then referenced from there instead of
//   using the original file-path. Similar to `webpack-isomorphic-tools`.
//   see: https://github.com/halt-hammerzeit/webpack-isomorphic-tools#getting-down-to-business
export default () => {
  filesHook({
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    base: rootForRequire,
  });
};
