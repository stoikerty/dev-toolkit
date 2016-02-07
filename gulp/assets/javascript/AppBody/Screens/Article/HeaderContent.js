import React from 'react';

export default class extends React.Component{
  constructor(props){
    super(props);
    this.displayName = 'Header';

    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <div className="image">
          <img src={this.props.image.src} alt={this.props.image.alt}/>
        </div>
        <div className="text">
          { this.props.title }
        </div>
      </div>
    );
  }
}
