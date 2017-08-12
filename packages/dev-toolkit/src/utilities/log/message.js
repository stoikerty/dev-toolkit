import chalk from 'chalk';
import stringLength from 'string-length';

export default ({ message, type, title, useSeparator }) => {
  const hasLinebreakAtEnd = message.lastIndexOf('\n') === (message.length - 1);
  let outputMessage = hasLinebreakAtEnd ? message.substring(0, message.lastIndexOf('\n')) : message;
  // console.log('hasLinebreakAtEnd: ', hasLinebreakAtEnd);

  switch (type) {
    case 'success':
      outputMessage = chalk.green(outputMessage);
      break;
    case 'warning':
      outputMessage = chalk.yellow(`⚠️  ${outputMessage}`);
      break;
    default:
      if (title) {
        outputMessage = `${chalk.magenta(`\n[ ${title} ]`)} ${chalk.grey(`- ${outputMessage}`)}`;
      } else {
        outputMessage = chalk.grey(outputMessage);
      }
  }

  if (useSeparator) {
    console.log(outputMessage);
    console.log(
      chalk.grey('܅'.repeat(stringLength(outputMessage) + (hasLinebreakAtEnd ? 1 : 0))),
      hasLinebreakAtEnd ? '\n' : '',
    );
  } else {
    console.log(
      outputMessage,
      hasLinebreakAtEnd ? '\n' : '',
    );
  }
};
