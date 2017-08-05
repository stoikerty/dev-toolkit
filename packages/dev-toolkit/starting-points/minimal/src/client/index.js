import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

const hotReRender = () => {
  // Dynamically require module inline for hot-reloading
  import('./views/Shell').then((module) => {
    const Shell = module.default;
    ReactDOM.render(
      <Shell />,
      document.querySelector('[data-jshook~="app-body"]'),
    );
  });
};

// Start app by rendering it for the first time, only after DOM has loaded.
domready(
  () => hotReRender(),
);

// Support hot-reloading of components by rerendering using webpack's included HMR.
// HMR stands for "Hot-Module-Replacement", also called "vanilla HMR"
if (module.hot) {
  module.hot.accept('./views/Shell', () => {
    setTimeout(hotReRender);
  });
}
