import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { buildFolder } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { help, log, bootstrap } from '../utilities';

bootstrap().then(({ server, userSettings }) => {
  let webpackAssets = {};
  const config = generateConfig({
    creatingBuild: false,
    getWebpackAssets: assets => {
      webpackAssets = assets;
      return JSON.stringify(assets);
    },
    userSettings,
  });

  log({ message: 'Starting Webpack…' });

  // Compile with middleware for hot-reloading
  const compiler = webpack({
    ...config,
    devtool: 'source-map',
    entry: {
      ...config.entry,
      app: ['webpack-hot-middleware/client'].concat(config.entry.app),
    },
  });

  log({ message: 'Compiling initial bundle…\n' });

  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
    stats: 'minimal',
    publicPath: config.output.publicPath,
  });
  const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

  webpackDevMiddlewareInstance.waitUntilValid(() => {
    log({ message: '\n✨  Initial compilation has finished.', type: 'success' });

    log({ message: 'Attaching dev-middleware & hot-middleware…' });
    try {
      server.express.use(webpackDevMiddlewareInstance);
      server.express.use(webpackHotMiddlewareInstance);
    } catch (error) {
      help({
        displayedWhen: server && !server.express,
        warning: 'Your server needs a `this.express` to be set for attaching webpack middleware.',
        instruction: 'Example: `constructor() { this.express = express(); }`',
        link: '/dev-toolkit#custom-server',
        error,
      });
    }

    log({ message: 'Starting your Server App…\n', useSeparator: true });
    try {
      server.start({ assets: webpackAssets, buildFolder });
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
});
