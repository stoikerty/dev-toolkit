#!/usr/bin/env node
var path = require('path');
var copyfiles = require('copyfiles');
var args = process.argv.slice(3);

if (args[0]) {
  var startingPoint = path.resolve(__dirname, '../../starting-point');
  var currentPath = path.resolve(process.cwd(), args[0]);
  console.log('copy: ', [startingPoint, currentPath]);

  // copyfiles([startingPoint, currentPath]);
} else {
  console.log('Please specify a name for your app.');
}
