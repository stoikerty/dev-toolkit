import React from 'react';
import { Link } from 'react-router';

import s from '../style/app.scss';
import Component from './AppBody/Component';

export default class AppBody extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'AppBody';

    this.state = {};
  }

  render() {
    return (
      <div className={s.AppBody}>
        { '{ universal-dev-toolkit }' }

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
