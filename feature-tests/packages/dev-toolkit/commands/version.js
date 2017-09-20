import { expect } from 'chai';
import shell from 'shelljs';

export default ({ pkg }) => {
  describe('version command `dev-toolkit version`', () => {
    it('runs without failure & outputs version number', (done) => {
      shell.exec('node ./node_modules/.bin/dev-toolkit version', { silent: true }, (code, stdout) => {
        expect(code, 'Exit code').to.equal(0);
        expect((stdout.indexOf(pkg.version) >= 0)).to.equal(true);
        done();
      });
    });
  });
};
