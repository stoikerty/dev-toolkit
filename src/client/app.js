import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import RedBox from 'redbox-react';

class App {
  constructor() {
    this.render = this.render.bind(this);
    this.hotReRender = this.hotReRender.bind(this);
    this.renderError = this.renderError.bind(this);
    this.rootElement = null;

    domready(()=> {
      this.rootElement = document.querySelector('[data-jshook~="app-body"]');
      this.render();

      // Support hot reloading of components
      if (module.hot) {
        module.hot.accept('./RouterContainer', () => {
          setTimeout(this.hotReRender);
        });
      }
    });
  }

  // render App with fresh version of required module
  render(){
    const RootComponent = require('./RouterContainer').default;

    ReactDOM.render(
      <RootComponent/>,
      this.rootElement
    );
  }

  // re-render after hot-reloading a module
  hotReRender(){
    try {
      this.render();
    } catch (error) {
      this.renderError(error);
    }
  }

  // display an overlay for runtime errors
  renderError(error){
    ReactDOM.render(
      <RedBox error={error} />,
      this.rootElement
    );
  }
}

// start up the app
new App();
