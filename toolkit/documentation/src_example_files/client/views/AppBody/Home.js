import React from 'react';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Home';

    this.state = {};
  }

  render() {
    return (
      <div>
        <small>
          { 'Home Page' }
        </small>
        <br/>
        { 'Click a link in the Navigation.' }
      </div>
    );
  }
}
