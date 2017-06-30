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

  describe('outputs current version', () => {
    it('when given `-v` argument', () => {
      sandbox.spy(console, 'log');
      devToolkit({ cmdArgs: ['dev-toolkit', '-v'], runCommand: () => {} });
      expect(console.log.calledOnce).to.equal(true);
    });
    it('when given `--version` argument', () => {
      sandbox.spy(console, 'log');
      devToolkit({ cmdArgs: ['dev-toolkit', '--version'], runCommand: () => {} });
      expect(console.log.calledOnce).to.equal(true);
    });
  });

  describe('runs the watch script', () => {
    const processedArgs = yargs.alias('w', 'watch').parse(['dev-toolkit', '-w']);
    const expectedOutput = {
      script: 'watch',
      message: 'Watching files for development',
      args: [processedArgs.watch],
    };

    it('when given `-w` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '-w'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
    it('when given `--watch` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--watch'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
  });

  describe('runs the serve script', () => {
    const processedArgs = yargs.alias('s', 'serve').parse(['dev-toolkit', '-s']);
    const expectedOutput = {
      script: 'serve',
      message: 'Watching files for development',
      args: [processedArgs.serve],
    };

    it('when given `-s` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '-s'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
    it('when given `--serve` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--serve'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
  });

  describe('runs the serveStatic script', () => {
    const processedArgs = yargs.alias('static', 'serve-static').parse(['dev-toolkit', '--static']);
    const expectedOutput = {
      script: 'serveStatic',
      message: 'Serving the /build folder using a minimal server',
      args: [processedArgs['serve-static']],
    };

    it('when given `--static` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--static'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
    it('when given `--serve-static` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--serve-static'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
  });

  describe('runs the init script', () => {
    const processedArgs = yargs.alias('i', 'init').parse(['dev-toolkit', '-i']);
    const expectedOutput = {
      script: 'init',
      message: 'Initializing new project',
      args: [processedArgs.init],
    };

    it('when given `-i` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '-i'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
    it('when given `--init` argument', () => {
      const runCommand = sandbox.spy();

      devToolkit({ cmdArgs: ['dev-toolkit', '--init'], runCommand });
      expect(runCommand.calledWith(expectedOutput)).to.equal(true);
    });
  });
});
