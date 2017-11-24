import { expect } from 'chai';
import path from 'path';
import shell from 'shelljs';
import time from 'to-time';

import { cacheDir } from 'src/utils';

export default ({ pkg }) => {
  describe(`local installation using \`npm install ${pkg.name}@${pkg.version}\``, () => {
    it('proceeds sucessfully', done => {
      // create a blank npm project for testing installation
      shell.exec(`cd ${cacheDir}`, { silent: true });
      shell.exec('npm init -y', { silent: true });
      // install current version
      shell.exec(`npm install ${pkg.name}@${pkg.version} --save`, { silent: true }, exitCode => {
        expect(exitCode, 'Exit code').to.equal(0);
        done();
      });
      // make sure it doesn't take longer than specified time
    }).timeout(time('1 minutes').ms());

    it('puts dev-toolkit in `package.json` dependencies', done => {
      import(path.resolve(cacheDir, 'package.json')).then(testPkg => {
        expect(testPkg.dependencies).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.equal(`^${pkg.version}`);
        done();
      });
    });
  });
};
