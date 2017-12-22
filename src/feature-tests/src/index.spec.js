import path from 'path';

import { rootDir, createCacheDir, cleanCacheDir } from 'src/utils';
import packageDevToolkit from './packages/dev-toolkit';
import templates from './templates';

const devToolkitDir = path.resolve(rootDir, 'packages/dev-toolkit');
const pkgPath = path.resolve(devToolkitDir, 'package.json');

// Remove cache-directory after running tests
before(done => createCacheDir(done));
after(done => cleanCacheDir(done));

describe('dev-toolkit & template tests', () => {
  it('imports package.json & runs all tests', () => {
    import(pkgPath).then(pkg => {
      // Install dev-toolkit in cache folder
      packageDevToolkit({ pkg });
      // Test each template with the dev-toolkit installation from above
      templates();
    });
  });
});
