import React from 'react';
import { Link } from 'react-router';

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

        <div className="current-route">
          { this.props.children }
        </div>
      </div>
    );
  }
}
