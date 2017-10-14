import installation from './installation';
import { version } from './commands';

export default ({ pkg }) => {
  describe('`dev-toolkit` npm-package', () => {
    installation({ pkg });
    version({ pkg });
  });
};
