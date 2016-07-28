#!/usr/bin/env node
var spawn = require('cross-spawn');
var path = require('path');
var isWin = process.platform === 'win32';

var currentPath = path.resolve(process.cwd());
var startScriptPath = path.resolve(__dirname, './start.js');

console.log('0.1 NODE_PATH before: ', process.env.NODE_PATH);
console.log('0.2 currentPath: ', currentPath);
console.log('0.3 startScriptPath: ', startScriptPath);

// Required for root-relative imports to work in server-rendering because webpack's alias
// is not picked up in node. For other solutions, see the following.
// https://gist.github.com/branneman/8048520
// https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
spawn(
  'node',
  [startScriptPath, '--color'],
  {
    env: {
      NODE_PATH: currentPath,
    },
    shell: !isWin,
    stdio: 'inherit',
  }
);
