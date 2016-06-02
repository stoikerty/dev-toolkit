#! /usr/bin/env node
var getInstalledPath = require('get-installed-path');
var path = require('path');
var $ = require('cash');

// Get the application and module paths
var appPath = process.cwd();
var modulePath = getInstalledPath('universal-dev-toolkit');

// Use the paths dynamically
$('cd ' + modulePath);
$('ncp ' + modulePath + '/toolkit/documentation/src_example_files ' + appPath);
