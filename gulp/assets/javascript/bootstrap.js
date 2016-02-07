// Create `window.app`-object
window.app = window.app || {};

// Set which environment we are running
app.isDev = window.isDev || false;

// Create application logging functionality
/*eslint-disable no-console */
app.log = function() {
  if (app.isDev && window.console && window.console.log)
    Function.apply.call(console.log, console, arguments);
};
app.warn = function() {
  if (app.isDev && window.console && window.console.warn)
    Function.apply.call(console.warn, console, arguments);
};
/*eslint-enable no-console */

// Utilities
// ---
import assetPath from './utils/assetPath';
import breakpoint from './utils/breakpoint';
import queryByHook from './utils/queryByHook';
import queryAllByHook from './utils/queryAllByHook';

app.utils = {
  // Dependencies >> window.assetPath
  assetPath,

  breakpoint,
  queryByHook,
  queryAllByHook,
};

// Polyfills
// ---
// Polyfill for `fetch` (which also needs `es6-promise` polyfill)
import 'whatwg-fetch';
import promise from 'es6-promise';
promise.polyfill();
