// Preconfigure the `app`-object
import './bootstrap';
import AppBody from './AppBody';

import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';
import each from 'amp-each';

// import individual utils
const { queryByHook } = app.utils;

class App {
  constructor() {
    app.articles = [];

    domready(()=>{
      ReactDOM.render((
        <AppBody/>
      ), queryByHook(document, 'app-body'));
    });
  }
}

// start up the app with shared coffeescript objects
app.instance = new App();
