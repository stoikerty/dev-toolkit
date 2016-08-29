#!/usr/bin/env node
require('../utils/bootstrap');

global.toolkitScript = 'build';
require('../../dist/build');
