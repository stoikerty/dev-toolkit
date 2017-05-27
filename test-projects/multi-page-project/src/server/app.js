// The application constructor is separate
import App from './bootstrap';

// NOTE:
//   The toolkit expects the `start` an `use`-methods below to be available.
//   It will use the methods for the development middleware, for running
//   the server and for generating static-rendered builds.

// Launch server later with webpack using an exported class
// The class needs `start` & `use`-methods
export default class {
  // Use this to start the server
  start(options = { message: null }) {
    App.start({ message: options.message });
  }

  // Bind the express middleware for webpack, this method should
  // redirect to & act in the same way as the express `use`-method.
  use(...middlewareOptions) {
    App.use(...middlewareOptions);
  }
}
