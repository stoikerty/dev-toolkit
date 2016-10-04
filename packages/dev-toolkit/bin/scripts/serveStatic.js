#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'serveStatic';
global.scriptOptions = {};
require('../../dist/serveStatic');
