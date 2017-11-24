import logMessage from './message';
import logError from './error';

export default ({ message, error, type, title, useSeparator }) => {
  /* eslint-disable no-underscore-dangle */
  const silent =
    (global.__devToolkitCommandOptions && global.__devToolkitCommandOptions.silent) || false;

  // Silence out any logs if necessary
  if (!silent) {
    if (message) {
      logMessage({ message, type, title, useSeparator });
    }
  }

  // Keep logging errors though
  if (error) {
    logError({ error });
  }
};
