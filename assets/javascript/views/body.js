import React from 'react';

var Body = React.createClass({
  getInitialState() {
    return {
      classes : '',
      color : true
    };
  },

  switchColor() {
    this.setState({
        color: !this.state.color
    });
  },

  render() {
    return (
      <body>
        <div
          onClick={this.switchColor}
          className={
            'app-body' +
            (this.state.color?
              ' white' : ' black')
        }>
        </div>
      </body>
    );
  }
});

export default Body;
