import React from 'react';

export default class NoMatch404 extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'NoMatch404';

    this.state = {};
  }

  render() {
    return (
      <div>
        <small>
          { '404 Error Page' }
        </small>
      </div>
    );
  }
}
