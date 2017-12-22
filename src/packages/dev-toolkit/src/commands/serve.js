import { buildFolder } from '../webpack/projectSettings';
import { help, log, bootstrap, getWebpackAssets } from '../utilities';

bootstrap().then(({ server }) => {
  log({ message: 'Starting your Server App…\n', useSeparator: true });
  try {
    getWebpackAssets().then(({ assets }) => server.start({ assets, buildFolder }));
  } catch (error) {
    help({
      displayedWhen: server && typeof server.start !== 'function',
      warning: 'Your server needs a `start`-method.',
      instruction: 'Example: `start({ assets }) { this.express.listen(2000); }`',
      link: '/dev-toolkit#custom-server',
      error,
    });
  }
});
