#! /usr/bin/env node
var getInstalledPath = require('get-installed-path');
var path = require('path');
var $ = require('cash');

// Get the application and module paths
var appPath = process.cwd();
var modulePath = getInstalledPath('universal-dev-toolkit');

// Use the paths dynamically
$('export UDT_APP_PATH=' + appPath);
$('export UDT_ROOT=' + modulePath);
$('export BABEL_ROOT_IMPORT_CUSTOM_ROOT_PATH=' + appPath);
$('cd ' + modulePath);
$('npm run dev');
