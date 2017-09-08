import React from 'react';
import ReactDOM from 'react-dom';

// NOTE: This File is only run on the client. The server imports `RootComponent` directly.

const hotReRender = () => {
  // Dynamically require module inline for hot-reloading
  const RootComponent = require('./RootComponent').default;
  // Render the newly required module to the DOM
  ReactDOM.render(
    <RootComponent />,
    document.querySelector('[data-jshook~="app-body"]'),
  );
};

// Start app by rendering it for the first time
hotReRender();

// Support hot-reloading of components by rerendering using webpack's included HMR.
// HMR stands for "Hot-Module-Replacement", sometimes referred as "vanilla HMR"
if (module.hot) {
  module.hot.accept('./RootComponent', () => {
    // After accepting the new module from webpack, we rerender on the next tick
    setTimeout(hotReRender);
  });
}
