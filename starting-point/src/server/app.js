// Preconfigure the global `app`-object
import './bootstrap';

// Launch server later with webpack using an exported class
// The class needs `start` & `use`-methods
export default class {
  // Use this to start the server
  start(options = { message: null }) {
    app.start({ message: options.message });
  }

  // Bind the express middleware for webpack, this method should
  // redirect to & act in the same way as the express `use`-method.
  use(...middlewareOptions) {
    app.use(...middlewareOptions);
  }
}
