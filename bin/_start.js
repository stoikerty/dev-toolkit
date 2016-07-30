#!/usr/bin/env node

console.log('0.4 NODE_PATH after: ', process.env.NODE_PATH);
var command = process.argv[2];
var args = process.argv.slice(3);

if (args[0] === '--version') {
  console.log('version --');
} else {
  switch (command) {
    case 'init':
      require('./start-commands/' + command);
      break;
    default:
      require('./start-commands/development');
      break;
  }
}
