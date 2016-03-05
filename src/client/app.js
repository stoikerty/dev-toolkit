import React from 'react';
import ReactDOM from 'react-dom';
import domready from 'domready';

class App {
  constructor() {
    domready(()=>{
      ReactDOM.render((
        <div className="app-body">
          { 'Hello World!' }
        </div>
      ), queryByHook(document, 'app-body'));
    });
  }
}

// start up the app with shared coffeescript objects
app.instance = new App();
