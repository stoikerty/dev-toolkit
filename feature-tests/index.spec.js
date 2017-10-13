import path from 'path';

import { rootDir, createCacheDir, cleanCacheDir } from '_testUtils/config';
import packageDevToolkit from './packages/dev-toolkit';
import templates from './templates';

// Create emoty cache-directory for running tests
const devToolkitDir = path.resolve(rootDir, 'packages/dev-toolkit');
const pkgPath = path.resolve(devToolkitDir, 'package.json');
const testDir = createCacheDir('dev-toolkit');

// Remove cache-directory after running tests
after(done => cleanCacheDir('dev-toolkit', done));

describe('dev-toolkit & template tests', () => {
  it('imports package.json & runs all tests', () => {
    import(pkgPath).then(pkg => {
      packageDevToolkit({ testDir, pkg });
      templates({ testDir, pkg });
    });
  });
});
