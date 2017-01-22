const chalk = require('chalk');

module.exports = function debug() {
  if (process.env.TOOLKIT_DEBUG === 'true') {
    var allArgs = [
      chalk.magenta('|| ') +
      chalk.blue(arguments['0'])
    ];
    allArgs = allArgs.concat([].splice.call(arguments, 1));
    console.log.apply(console, allArgs);
  }
}
