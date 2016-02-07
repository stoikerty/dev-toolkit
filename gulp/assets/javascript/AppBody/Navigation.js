import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Navigation';

    this.state = {};
  }

  render() {
    return (
      <div className="app-component navigation">
        <h3>Navigation</h3>
        <ul>
          <li><Link to="/">Summary</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/none">Non-existing Route</Link></li>
        </ul>
      </div>
    );
  }
}
