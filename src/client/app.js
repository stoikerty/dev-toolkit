import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

let render = () => {
  const Router = require('./Router').default;
  const rootEl = document.querySelector('[data-jshook~="app-body"]');
  ReactDOM.render(
    <Router/>,
    rootEl
  );
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const rootEl = document.querySelector('[data-jshook~="app-body"]');
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  };
  module.hot.accept('./Router', () => {
    setTimeout(render)
  });
}

domready(()=> {
  render();
});
