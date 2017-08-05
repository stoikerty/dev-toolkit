import logMessage from './log/message';
import logError from './log/error';

export default ({ message, error, type }) => {
  if (message) {
    logMessage({ message, type });
  }
  if (error) {
    logError({ error });
  }
};
