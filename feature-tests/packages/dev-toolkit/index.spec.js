import path from 'path';

import { rootDir, createCacheDir, cleanCacheDir } from 'shared/config';
import installation from './installation';
import { version } from './commands';

const devToolkitDir = path.resolve(rootDir, 'packages/dev-toolkit');
const pkgPath = path.resolve(devToolkitDir, 'package.json');
const testDir = createCacheDir('dev-toolkit');

describe('dev-toolkit', () => {
  after((done) => cleanCacheDir('dev-toolkit', done));

  import(pkgPath).then((pkg) => {
    installation({ testDir, pkg });
    version({ pkg });
  });
});
