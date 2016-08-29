#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'build';
global.scriptOptions = {
  dynamic: process.argv[2] === 'dynamic',
};
require('../../dist/build');
