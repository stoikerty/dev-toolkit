import React from 'react';
import Component from './ExamplePage/Component';

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
          { 'Example Page' }
        </small>

        {/* Styled Example Component */}
        <Component/>
      </div>
    );
  }
}
