import { expect } from 'chai';
import path from 'path';
import shell from 'shelljs';
import time from 'to-time';

export default ({ testDir, pkg }) => {
  describe(`local installation using \`npm install ${pkg.name}@${pkg.version}\``, () => {
    it('proceeds sucessfully', (done) => {
      shell.exec('npm init -y', { silent: true });
      shell.exec(`npm install ${pkg.name}@${pkg.version}`, { silent: true }, (code) => {
        expect(code, 'Exit code').to.equal(0);
        done();
      });
    }).timeout(time('2 minutes').ms());

    it('puts dev-toolkit in the dependencies', (done) => {
      import(path.resolve(testDir, 'package.json')).then((testPkg) => {
        expect(testPkg.dependencies).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.equal(`^${pkg.version}`);
        done();
      });
    });
  });
};