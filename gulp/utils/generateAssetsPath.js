var fs = require("fs");
var path = require("path");
var hashdirectory = require('hashdirectory');
var filename = '../assets-version.json';

// TODO:
// production variable set here, should be integrated using custom mechanism
var production = false;

module.exports = function(options) {
  var content = { assetsVersion: '/' + (options.name || 'dev-files') };

  if (production) {
    // generate hash of the complete assets directory
    var hash = hashdirectory.sync(path.resolve(__dirname, '../assets'));
    content.assetsVersion = '/version-' + hash;
  }

  fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(content));

  return content.assetsVersion;
};
