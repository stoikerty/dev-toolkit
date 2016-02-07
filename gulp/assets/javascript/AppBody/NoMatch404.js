import React from 'react';

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = '404';

    this.state = {};
  }

  render() {
    return (
      <div className="404">
        Nothing found under this URL
      </div>
    );
  }
}
