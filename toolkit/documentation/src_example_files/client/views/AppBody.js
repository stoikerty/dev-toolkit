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
        {/*
          You can still use inline styles, but it is preferable to use
          the css-modules approach from the Example-component below.
        */}
        <div style={{ textAlign: 'center', margin: '8px', fontWeight: 'bold' }}>
          { '{ universal-dev-toolkit }' }
        </div>

        <div style={{ textAlign: 'center', opacity: 0.6 }}>
          <Link to="/example-page">
            { 'Example Page' }
          </Link>
          {' - '}
          <Link to="/somewhere-else">
            {' Non-existing Page' }
          </Link>
        </div>
        <hr/>

        <div className="current-route" style={{ textAlign: 'center'}}>
          { this.props.children }
        </div>

        {/* Styled Example Component */}
        <hr/>
        <Component/>
      </div>
    );
  }
}
