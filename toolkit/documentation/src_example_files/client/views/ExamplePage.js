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
        { 'Example Page' }
      </div>
    );
  }
}
