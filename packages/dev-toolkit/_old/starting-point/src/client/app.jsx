import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import RedBox from 'redbox-react';

// Note: `RouterContainer`-module is required inline

// `app.js`
// --------
// This file is responsible mainly for handling hot-reloading. It reloads the main root container
// (RouterContainer) whenever one of the files that gets imported by that container change.
// An error is displayed if something goes wrong or a syntax-error occurs.

// Create a Client-App with hot-reloading capabilities
class App {
  constructor() {
    this.renderApp = this.renderApp.bind(this);
    this.hotReRender = this.hotReRender.bind(this);
    this.renderError = this.renderError.bind(this);
    this.rootElement = null;

    // Only proceed with rendering if we're not using a test-framework
    if (document.body.id !== 'mock-dom') {
      // When browser has finished loading, retrieve app-body element and render
      domready(() => {
        this.rootElement = document.querySelector('[data-jshook~="app-body"]');
        this.renderApp();

        // Support hot reloading of components by rerendering via vanilla webpack
        // HMR (Hot-Module-Replacement) & setTimeout
        if (module.hot) {
          module.hot.accept('./RouterContainer', () => {
            setTimeout(this.hotReRender);
          });
        }
      });
    }
  }

  // Render App with fresh version of required Routing module
  renderApp() {
    // eslint-disable-next-line global-require
    const RootComponent = require('./RouterContainer').default;

    ReactDOM.render(
      <RootComponent />,
      this.rootElement
    );
  }

  // Re-render after hot-reloading a module,
  // display error if something during the compilation goes wrong.
  hotReRender() {
    try {
      this.renderApp();
    } catch (error) {
      this.renderError(error);
    }
  }

  // Risplay an overlay for runtime errors
  renderError(error) {
    ReactDOM.render(
      <RedBox error={error} />,
      this.rootElement
    );
  }
}

// start up the app immediately
window.app = new App();
