var fs   = require("fs");
var path = require("path");
var filename = '../assets-version.json';

module.exports = function() {
  var file = fs.readFileSync(path.resolve(__dirname, filename), "utf8");
  return JSON.parse(file).assetsVersion;
};
