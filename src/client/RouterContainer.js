import React from 'react';
import { Router, browserHistory, RouterContext } from 'react-router';

import routes from './routes';

export default class RouterContainer extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'RouterContainer';

    this.state = {};
  }

  render() {
    return (
      <Router
        routes={routes}
        history={browserHistory}
        render={props => <RouterContext {...props}/>}
      />
    );
  }
}
