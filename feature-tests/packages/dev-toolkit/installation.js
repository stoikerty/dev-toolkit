import { expect } from 'chai';
import path from 'path';
import shell from 'shelljs';
import time from 'to-time';

export default ({ testDir, pkg }) => {
  describe(`local installation using \`npm install ${pkg.name}@${pkg.version}\``, () => {
    it('proceeds sucessfully', done => {
      // create a blank npm project
      shell.exec('npm init -y', { silent: true });
      // install current version
      shell.exec(`npm install ${pkg.name}@${pkg.version} --save`, { silent: true }, code => {
        expect(code, 'Exit code').to.equal(0);
        done();
      });
      // make sure it doesn't take longer than specified time
    }).timeout(time('2 minutes').ms());

    it('puts dev-toolkit in the dependencies', done => {
      import(path.resolve(testDir, 'package.json')).then(testPkg => {
        expect(testPkg.dependencies).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.not.equal(undefined);
        expect(testPkg.dependencies[pkg.name]).to.equal(`^${pkg.version}`);
        done();
      });
    });
  });
};
