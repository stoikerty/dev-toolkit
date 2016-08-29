import path from 'path';
import { rootForRequire } from '../../_userSettings';

// Setup `app`-object globally so it's same as on the client
// eslint-disable-next-line global-require
require(path.join(rootForRequire, '/src/client/app'));
global.app = window.app;
