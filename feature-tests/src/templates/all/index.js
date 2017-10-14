import { expect } from 'chai';
import chalk from 'chalk';
import time from 'to-time';

import { runDevToolkitCli } from 'src/utils';

const enableOutputLogging = false;
const logOutput = output => {
  if (enableOutputLogging) {
    console.log(chalk.blue(output));
  }
};

export default ({ name, isDefault } = { isDefault: false }) => {
  describe('can be used to initialize a new app', () => {
    it(`including comments, with specified template ${name}`, done => {
      runDevToolkitCli({
        command: `init ${name}_app --template ${name}`,
      }).then(({ exitCode, output }) => {
        expect(exitCode, 'Exit code').to.equal(0);
        logOutput(output);
        done();
      });
    }).timeout(time('1 minutes').ms());
    it(`skipping comments, with specified template ${name}`, done => {
      runDevToolkitCli({
        command: `init ${name}_app_no_comment --template ${name} --skipComments`,
      }).then(({ exitCode, output }) => {
        expect(exitCode, 'Exit code').to.equal(0);
        logOutput(output);
        done();
      });
    }).timeout(time('1 minutes').ms());

    if (isDefault) {
      it('with no specified template, including comments', done => {
        runDevToolkitCli({
          command: `init ${name}_default_app --skipComments`,
        }).then(({ exitCode, output }) => {
          expect(exitCode, 'Exit code').to.equal(0);
          logOutput(output);
          done();
        });
      }).timeout(time('1 minutes').ms());
      it('with no specified template, skipping comments', done => {
        runDevToolkitCli({
          command: `init ${name}_default_app_no_comment --skipComments`,
        }).then(({ exitCode, output }) => {
          expect(exitCode, 'Exit code').to.equal(0);
          logOutput(output);
          done();
        });
      }).timeout(time('1 minutes').ms());
    }
  });
};
