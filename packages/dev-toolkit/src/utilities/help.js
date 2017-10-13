import log from './log';

export default ({ displayedWhen, warning, instruction, link, error }) => {
  if (displayedWhen) {
    log({ message: warning, type: 'warning' });
    if (instruction) {
      log({ message: instruction, type: 'success' });
    }
    if (link) {
      log({ message: `see: https://github.com/stoikerty${link}\n` });
    }
    if (error) {
      log({ error });
    }

    process.exit();
  } else {
    log({ error });
  }
};
