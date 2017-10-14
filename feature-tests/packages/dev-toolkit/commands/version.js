import { expect } from 'chai';

import { runDevToolkitCli } from 'testUtils/config';

export default ({ pkg }) => {
  describe('command: `dev-toolkit version`', () => {
    it('runs without failure, outputs version number', done => {
      runDevToolkitCli({ command: 'version' }).then(({ exitCode, output }) => {
        expect(exitCode, 'Exit code').to.equal(0);
        expect(output.indexOf(pkg.version) >= 0).to.equal(true);
        done();
      });
    });
  });
};
