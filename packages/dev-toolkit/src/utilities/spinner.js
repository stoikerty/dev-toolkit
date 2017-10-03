import ora from 'ora';
import { grey, blue, magenta, green } from 'chalk';

export default new class {
  constructor() {
    this.spinner = ora({
      text: grey('Loading'),
      spinner: {
        interval: 130,
        frames: [
          grey('·') + blue('·') + grey(' ') + grey(' '),
          grey(' ') + grey('·') + blue('·') + grey(' '),
          grey(' ') + grey(' ') + grey('·') + blue('·'),
          grey(' ') + grey(' ') + grey(' ') + blue('•'),
          grey(' ') + grey(' ') + blue('·') + grey('·'),
          grey(' ') + blue('·') + grey('·') + grey(' '),
          blue('·') + grey('·') + grey(' ') + grey(' '),
          blue('•') + grey(' ') + grey(' ') + grey(' '),

          grey('·') + magenta('·') + grey(' ') + grey(' '),
          grey(' ') + grey('·') + magenta('·') + grey(' '),
          grey(' ') + grey(' ') + grey('·') + magenta('·'),
          grey(' ') + grey(' ') + grey(' ') + magenta('•'),
          grey(' ') + grey(' ') + magenta('·') + grey('·'),
          grey(' ') + magenta('·') + grey('·') + grey(' '),
          magenta('·') + grey('·') + grey(' ') + grey(' '),
          magenta('•') + grey(' ') + grey(' ') + grey(' '),

          grey('·') + green('·') + grey(' ') + grey(' '),
          grey(' ') + grey('·') + green('·') + grey(' '),
          grey(' ') + grey(' ') + grey('·') + green('·'),
          grey(' ') + grey(' ') + grey(' ') + green('•'),
          grey(' ') + grey(' ') + green('·') + grey('·'),
          grey(' ') + green('·') + grey('·') + grey(' '),
          green('·') + grey('·') + grey(' ') + grey(' '),
          green('•') + grey(' ') + grey(' ') + grey(' '),
        ],
      },
    });
  }

  start({ message }) {
    this.spinner.start(grey(message));
  }
  stop() {
    this.spinner.stop();
  }
}();
