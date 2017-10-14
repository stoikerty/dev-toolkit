import { expect } from 'chai';

import { runDevToolkitCli } from 'testUtils/config';

export default () => {
  describe('standard', () => {
    it('does stuff', done => {
      runDevToolkitCli({ command: 'version' }).then(({ exitCode, output }) => {
        expect(exitCode, 'Exit code').to.equal(0);
        // console.log(output);
        done();
      });
    });
  });
};

// describe('standard template - client', () => {
//   it('renders on the browser', () => {});
//   it('hot-reloads after making a change in App.js', () => {});
// });
// describe('standard template - server', () => {
//   it('server-renders app', () => {});
//   it('pre-renders app', () => {});
// });
