import path from 'path';
import { ensureDirSync, removeSync } from 'fs-extra';
import shell from 'shelljs';

import installation from './installation';
import { version } from './commands';

const rootDir = path.resolve(__dirname, '../../../');
const devToolkitDir = path.resolve(rootDir, 'packages/dev-toolkit');
const testDir = path.resolve(rootDir, 'feature-tests/_temp-cache');

import(path.resolve(devToolkitDir, 'package.json')).then((pkg) => {
  describe('dev-toolkit', () => {
    before((done) => {
      ensureDirSync(testDir);
      shell.cd(testDir);
      done();
    });
    after((done) => {
      removeSync(testDir);
      done();
    });

    installation({ testDir, pkg });

    // commands
    version({ testDir, pkg });
  });
});
