#!/usr/bin/env node
import '../utils/bootstrap';

global.toolkitScript = 'build';
global.scriptOptions = {
  dynamic: process.argv[2] === 'dynamic',
};

console.log('run build command');
// require('../../commands/build');
