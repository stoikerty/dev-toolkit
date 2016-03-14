import React from 'react';
import { Link } from 'react-router';

// Styles are imported here, they are currently only supported on the client
// so leaving the import on while starting the server makes the server break
// TODO: implement `webpack-isomorphic-tools`
import s from './style/app.scss';
// import s from './style.scss';
// if (typeof window !== 'undefined') require('./style/app.scss');
// else console.log('server');
import Component from './AppBody/Component';

export default class AppBody extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'AppBody';

    this.state = {};
  }

  render() {
    return (
      <div className="app-body">
        { '{ stk-toolkit-4 }' }

        <div className="navigation">
          <Link to="/example-page">
            { 'Example Page' }
          </Link>
          <Link to="/somewhere-else">
            {' Non-existing Page' }
          </Link>
        </div>

        <Component/>

        <div className="current-route">
          { this.props.children }
        </div>
      </div>
    );
  }
}
