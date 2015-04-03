var fs = require("fs");
var path = require("path");
var hashdirectory = require('hashdirectory');
var filename = '../assets-version.json';

// production variable set here, should be integrated using custom mechanism
var production = false;

module.exports = function() {
  var content = { assetsVersion: '/assets-' + 'dev' };

  if (production) {
    // generate hash of the complete assets directory
    var hash = hashdirectory.sync(path.resolve(__dirname, '../assets'));
    content.assetsVersion = '/assets-' + hash;
  }

  fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(content));

  return content.assetsVersion;
};
