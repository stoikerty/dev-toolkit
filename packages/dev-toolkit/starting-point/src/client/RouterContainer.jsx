import React from 'react';
import { Router, browserHistory, RouterContext } from 'react-router';

import routes from './routes';

// `RouterContainer.js`
// --------------------
// The root-container of our App that manages the configured routes. If you use
// Redux, the <Provider> component should wrap the <Router> below. Note how
// this file uses capitalized camel-case to denote that it is a React-component.

export default class RouterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RouterContainer';

    this.state = {};
  }

  render() {
    return (
      <Router
        routes={routes}
        history={browserHistory}
        render={props => <RouterContext {...props} />}
      />
    );
  }
}
