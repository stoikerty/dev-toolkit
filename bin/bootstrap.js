#!/usr/bin/env node
var spawn = require('cross-spawn');

console.log('0.1 NODE_PATH before: ', process.env.NODE_PATH);

// Required for root-relative imports to work in server-rendering,
// because webpack's alias is not picked up in node.
// For other solutions, see the following.
// https://gist.github.com/branneman/8048520
// https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
spawn(
  'node',
  [require.resolve('./start.js')],
  {
    env: {
      NODE_PATH: process.cwd()
    },
    stdio: 'inherit'
  }
);
