import { expect } from 'chai';
import yargs from 'yargs';

import sandbox from 'dist/utilities/testHelpers/sandbox';

import devToolkit from './dev-toolkit';

describe('dev-toolkit', () => {
  const previousEnv = process.env.TOOLKIT_DEBUG;
  sandbox.use(before, after);

  afterEach(() => {
    process.env.TOOLKIT_DEBUG = previousEnv;
  });

  describe('runs the toolkit in debug-mode', () => {
    it('when given `-d` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '-d'], runCommand });
      expect(process.env.TOOLKIT_DEBUG).to.equal('true');
    });
    it('when given `--debug` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--debug'], runCommand });
      expect(process.env.TOOLKIT_DEBUG).to.equal('true');
    });
  });

  it('outputs current version when given `-v` or `--version` argument', () => {
  });

  it('runs the watch script when given `-w` or `--watch` argument', () => {
    const runCommand = sandbox.spy();
    const processedArgs = yargs.alias('w', 'watch').parse(['dev-toolkit', '-w']);
    const expectedOutput = {
      script: 'watch',
      message: 'Watching files for development',
      args: [processedArgs.watch],
    };

    devToolkit({ cmdArgs: ['dev-toolkit', '-w'], runCommand });
    expect(runCommand.calledWith(expectedOutput)).to.equal(true);

    devToolkit({ cmdArgs: ['dev-toolkit', '--watch'], runCommand });
    expect(runCommand.calledWith(expectedOutput)).to.equal(true);
  });
});
