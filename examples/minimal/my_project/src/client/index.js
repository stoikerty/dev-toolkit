import React from 'react';
import ReactDOM from 'react-dom';

const hotReRender = () => {
  import('./RootComponent').then((module) => {
    const RootComponent = module.default;
    ReactDOM.hydrate(<RootComponent />, document.querySelector('[data-jshook~="app-body"]'));
  });
};

hotReRender();

if (module.hot) {
  module.hot.accept('./RootComponent', () => setTimeout(hotReRender));
}
