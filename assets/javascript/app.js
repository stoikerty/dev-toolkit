// create global app object
window.app = {};

// Start Web Client
var React = require('react');
var domready = require('domready');
var Body = require('./views/body');

app.init = function(){
  domready(function(){
    startApp();
  });
};

function startApp(){
  // Populate the head with meta tags
  var meta = document.createElement('meta');
  meta.httpEquiv = 'X-UA-Compatible';
  meta.content = 'IE=edge';
  document.getElementsByTagName('head')[0].appendChild(meta);

  var viewPortTag = document.createElement('meta');
  viewPortTag.id = 'viewport';
  viewPortTag.name = 'viewport';
  viewPortTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1';
  document.getElementsByTagName('head')[0].appendChild(viewPortTag);

  // Render the document body
  React.render(<Body/>, document.body);
}

window.app.init();
