#!/usr/bin/env node
const path = require('path');
const copy = require('ncp');
const debug = require('../utils/debug');
const appName = process.argv[2];

if (appName) {
  const startingPoint = path.resolve(__dirname, '../../starting-point');
  const appPath = path.resolve(process.cwd(), appName);

  debug('startingPoint', startingPoint);
  debug('appPath', appPath);

  copy(startingPoint, appPath, function onFinish(err){
     if (err) {
       return console.error(err);
     }
     console.log('done!');
  });
} else {
  console.log('Please specify a name for your app.');
  console.log('dev-toolkit --init my_app');
}
