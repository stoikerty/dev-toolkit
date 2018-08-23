import chalk from 'chalk';

export default ({ error }) => {
  if (error) {
    const errorType = /^.*(Error: )/gi;
    console.log(`${chalk.red(error.stack.match(errorType))}${error.stack.replace(errorType, '')}`);

    // Don't proceed further and exit with correct error code
    process.exit(1);
  }
};
