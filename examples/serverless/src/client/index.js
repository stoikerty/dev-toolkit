// NOTE: This File is only run on the client only.
// The server imports `RootComponent` directly.
import React from 'react';
import ReactDOM from 'react-dom';

const hotReRender = () => {
  // Dynamically require module inline for hot-reloading
  import('./RootComponent').then((module) => {
    const RootComponent = module.default;
    // Render the newly required module to the DOM
    ReactDOM.hydrate(<RootComponent />, document.querySelector('[data-jshook~="app-body"]'));
  });
};

// Start the app by rendering it for the first time
hotReRender();

// Support hot-reloading of components by rerendering using webpack's included HMR.
// HMR stands for "Hot-Module-Replacement", sometimes referred as "vanilla HMR"
if (module.hot) {
  // After accepting the new module from webpack, we rerender on the next tick
  module.hot.accept('./RootComponent', () => setTimeout(hotReRender));
}
