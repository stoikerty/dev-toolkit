#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'watch';
require('../../dist/watch');
