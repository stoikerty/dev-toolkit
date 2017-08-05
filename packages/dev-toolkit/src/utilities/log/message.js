import chalk from 'chalk';

export default ({ message, type }) => {
  switch (type) {
    case 'success':
      console.log(chalk.green(message));
      break;
    case 'warning':
      console.log(chalk.yellow(`⚠️  ${message}`));
      break;
    default:
      console.log(chalk.grey(message));
  }
};
