#! /usr/bin/env node
var getInstalledPath = require('get-installed-path');
var shell = require('shelljs');
var path = require('path');

var appPath = process.cwd();
var modulePath = getInstalledPath('universal-dev-toolkit');

shell.env['UDT_APP_PATH'] = appPath;
shell.env['UDT_ROOT'] = modulePath;
shell.env['BABEL_ROOT_IMPORT_CUSTOM_ROOT_PATH'] = appPath;
// console.log(path.join(shell.env['UDT_APP_PATH'], '/src/server/app'));

var command = 'npm run dev';
// var devPath = path.join(modulePath, '/toolkit/webpack/development.js');
// var command = 'babel-node ' + devPath;
console.log(command);
shell.cd(modulePath);
shell.exec(command);
