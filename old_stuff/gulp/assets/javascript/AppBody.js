import React from 'react';

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'AppBody';

    this.state = {};
  }

  render() {
    return (
      <div className="app-body">
        { 'Hello World!' }
      </div>
    );
  }
}
