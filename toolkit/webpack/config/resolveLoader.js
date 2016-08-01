import path from 'path';

import {
  rootForProject,
  rootForToolkit,
} from '../../_userSettings';

export default {
  modulesDirectories: [
    path.resolve(rootForProject, 'node_modules'),
    path.resolve(rootForToolkit, 'node_modules'),
  ],
};
