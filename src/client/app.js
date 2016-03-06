import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import { Router, browserHistory, RouterContext } from 'react-router';

import routes from './routes';
import AppBody from './AppBody';

class App {
  constructor() {
    domready(()=> {
      ReactDOM.render((
        <Router
          routes={routes}
          history={browserHistory}
          render={props => <RouterContext {...props}/>}
        />
      ), document.querySelector('[data-jshook~="app-body"]'));
    });
  }
}

// start up the app
new App();
