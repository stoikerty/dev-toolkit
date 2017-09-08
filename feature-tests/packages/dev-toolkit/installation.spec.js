import { expect } from 'chai';
import path from 'path';
import { ensureDirSync, removeSync } from 'fs-extra';
import shell from 'shelljs';

const rootDir = path.resolve(__dirname);
const devToolkitDir = path.resolve(rootDir, '../../../packages/dev-toolkit');
const testDir = path.resolve(rootDir, 'temporary-test-dir');
const pkg = require(path.resolve(devToolkitDir, 'package.json'));

describe('dev-toolkit installation', () => {
  before((done) => {
    ensureDirSync(testDir);
    shell.cd(testDir);
    done();
  });
  after((done) => {
    removeSync(testDir);
    done();
  });
  it(`current version installs sucessfully using \`npm install ${pkg.name}@${pkg.version}\``, (done) => {
    shell.exec(`npm init -y > /dev/null`);
    shell.exec(`npm install ${pkg.name}@${pkg.version} > /dev/null`);
    const testPkg = require(path.resolve(testDir, 'package.json'));
    expect(testPkg.dependencies).to.not.equal(undefined);
    expect(testPkg.dependencies[pkg.name]).to.not.equal(undefined);
    expect(testPkg.dependencies[pkg.name]).to.equal(`^${pkg.version}`);
    done();
  });
});
