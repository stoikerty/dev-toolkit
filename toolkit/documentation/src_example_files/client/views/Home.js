import React from 'react';

export default class ExamplePage extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'ExamplePage';

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
