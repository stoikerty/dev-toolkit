import logMessage from './log/message';
import logError from './log/error';

export default ({ message, error, type, title, useSeparator }) => {
  if (message) {
    logMessage({ message, type, title, useSeparator });
  }
  if (error) {
    logError({ error });
  }
};
