import React from 'react';
import { Link } from 'react-router';

import s from '../style/app.scss';

export default class AppBody extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'AppBody';

    this.state = {};
  }

  render() {
    return (
      <div className={s.AppBody}>

        {/* Title */}
        {/*
          You can still use inline styles as shown here, but it is preferable
          to use the css-modules approach from the Example-page below.
        */}
        <div style={{ textAlign: 'center', margin: '8px', fontWeight: 'bold' }}>
          { '{ universal-dev-toolkit }' }
        </div>

        {/* Navigation */}
        <div style={{ textAlign: 'center', opacity: 0.6 }}>
          <Link to="/">
            { 'Home' }
          </Link>
          {' - '}
          <Link to="/example-page">
            { 'Example Page' }
          </Link>
          {' - '}
          <Link to="/somewhere-else">
            {' Non-existing Page' }
          </Link>
        </div>

        {/* Pages */}
        <hr/>
        <div className="current-route" style={{ textAlign: 'center'}}>
          { this.props.children }
        </div>
        <hr/>

      </div>
    );
  }
}
