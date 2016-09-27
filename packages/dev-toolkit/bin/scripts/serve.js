#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'serve';
global.scriptOptions = {};
require('../../dist/serve');
