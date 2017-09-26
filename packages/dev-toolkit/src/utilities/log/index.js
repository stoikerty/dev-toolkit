import logMessage from './message';
import logError from './error';

export default ({ message, error, type, title, useSeparator }) => {
  if (message) {
    logMessage({ message, type, title, useSeparator });
  }
  if (error) {
    logError({ error });
  }
};
