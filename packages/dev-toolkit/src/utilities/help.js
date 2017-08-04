import log from './log';

export default ({ displayedWhen, warning, instruction, link, error }) => {
  if (displayedWhen) {
    log({ message: warning, type: 'warning' });
    log({ message: instruction, type: 'success' });
    log({ message: `see: https://github.com/stoikerty${link}\n` });
    log({ error });

    process.exit();
  } else {
    log({ error });
  }
};
