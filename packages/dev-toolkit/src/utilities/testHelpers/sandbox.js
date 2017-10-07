import sinon from 'sinon';

// This class will serve as our proxy for creating and restoring each sandbox
// We can either use the sandbox globally or only within a specified `describe`-block
class Sandbox {
  constructor(options = { global: false }) {
    this.instance = null;
    this.useSandbox = false;
    this.useGlobalSandbox = options.global;
  }

  use(beforeCallback, afterCallback) {
    beforeCallback(() => {
      this.useSandbox = true;
    });
    afterCallback(() => {
      this.useSandbox = false;
    });
  }
  create() {
    if (this.useGlobalSandbox || this.useSandbox) {
      this.instance = sinon.sandbox.create();
    }
  }
  restore() {
    if (this.useGlobalSandbox || this.useSandbox) {
      this.instance.restore();
    }
  }

  // Replicate sinon's `sandbox` methods
  // see: http://sinonjs.org/docs/#sinon-sandbox
  spy(...args) {
    return this.instance && this.instance.spy(...args);
  }
  stub(...args) {
    return this.instance && this.instance.stub(...args);
  }
  mock(...args) {
    return this.instance && this.instance.mock(...args);
  }
  useFakeTimers(...args) {
    return this.instance && this.instance.useFakeTimers(...args);
  }
  useFakeXMLHttpRequest(...args) {
    return this.instance && this.instance.useFakeXMLHttpRequest(...args);
  }
  useFakeServer(...args) {
    return this.instance && this.instance.useFakeServer(...args);
  }
}

// 1. Instantiate class
const sandbox = new Sandbox({ global: false });

// 2. Use sandbox's methods in mocha's "Root-Level Hooks"
//    see: https://mochajs.org/#root-level-hooks
beforeEach(() => {
  sandbox.create();
});
afterEach(() => {
  sandbox.restore();
});

// 3. Export class to use as sandbox replacement
export default sandbox;
