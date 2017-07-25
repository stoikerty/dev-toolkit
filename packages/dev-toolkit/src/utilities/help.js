import chalk from 'chalk';

export default ({ warning, instruction, link, error }) => {
  console.log(chalk.yellow(warning));
  console.log(chalk.green(instruction));
  console.log(chalk.gray(`see: https://github.com/stoikerty${link}`));
  console.log(chalk.gray('error trace:'), error, '\n');
};
