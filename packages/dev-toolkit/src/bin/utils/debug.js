import chalk from 'chalk';

export default (...args) => {
  if (process.env.TOOLKIT_DEBUG === 'true') {
    let allArgs = [
      chalk.magenta('|| ') + chalk.blue(args['0']),
    ];
    allArgs = allArgs.concat([].splice.call(args, 1));
    console.log(...allArgs);
  }
};
