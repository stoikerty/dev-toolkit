var React = require('react');

var Body = React.createClass({
  getInitialState : function () {
    return {
      classes : '',
      color : true
    };
  },

  switchColor : function () {
    this.setState({
        color: !this.state.color
    });
  },

  render : function () {
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

module.exports = Body;
