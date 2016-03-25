import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import RedBox from 'redbox-react';
// Note: `RouterContainer`-module is required below

// Creates a Client-App with hot-reloading capabilities
class App {
  constructor() {
    this.render = this.render.bind(this);
    this.hotReRender = this.hotReRender.bind(this);
    this.renderError = this.renderError.bind(this);
    this.rootElement = null;

    // When browser has finished leading, retrieve app-body element and render
    domready(()=> {
      this.rootElement = document.querySelector('[data-jshook~="app-body"]');
      this.render();

      // Support hot reloading of components by rerendering via vanilla webpack
      // HMR (Hot-Module-Replacement) & setTimeout
      if (module.hot) {
        module.hot.accept('./RouterContainer', () => {
          setTimeout(this.hotReRender);
        });
      }
    });
  }

  // Render App with fresh version of required Routing module
  render(){
    const RootComponent = require('./RouterContainer').default;

    ReactDOM.render(
      <RootComponent/>,
      this.rootElement
    );
  }

  // Re-render after hot-reloading a module,
  // display error if something during the compilation goes wrong.
  hotReRender(){
    try {
      this.render();
    } catch (error) {
      this.renderError(error);
    }
  }

  // Risplay an overlay for runtime errors
  renderError(error){
    ReactDOM.render(
      <RedBox error={error} />,
      this.rootElement
    );
  }
}

// start up the app immediately
new App();
