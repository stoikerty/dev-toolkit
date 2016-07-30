import path from 'path';

import {
  rootForToolkit,
} from '../../_userSettings';

export default {
  modulesDirectories: [
    path.resolve(rootForToolkit, 'node_modules'),
  ],
};
