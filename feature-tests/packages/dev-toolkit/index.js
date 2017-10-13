import installation from './installation';
import { version } from './commands';

export default ({ testDir, pkg }) => {
  describe('dev-toolkit', () => {
    installation({ testDir, pkg });
    version({ pkg });
  });
};
