#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'watch';
global.scriptOptions = {};
require('../../dist/watch');
