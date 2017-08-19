/* eslint-disable import/no-dynamic-require, global-require */
import { pathExistsSync } from 'fs-extra';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { serverAppEntryPoint } from '../webpack/projectSettings';
import generateConfig from '../webpack/config';
import { help, log } from '../utilities';

log({ message: 'Importing Server App…' });

import(serverAppEntryPoint).then((module) => {
  const server = module.default;
  let webpackAssets = {};
  const config = generateConfig({
    getWebpackAssets: (assets) => { webpackAssets = assets; return JSON.stringify(assets); },
    createBuild: false,
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

  const webpackDevMiddlewareInstance = webpackDevMiddleware(
    compiler,
    { noInfo: true, publicPath: config.output.publicPath },
  );
  const webpackHotMiddlewareInstance = webpackHotMiddleware(compiler);

  webpackDevMiddlewareInstance.waitUntilValid(() => {
    log({ message: '\n✨  Initial compilation has finished.', type: 'success' });

    log({ message: 'Attaching dev-middleware & hot-middleware…' });
    try {
      server.use(webpackDevMiddlewareInstance);
      server.use(webpackHotMiddlewareInstance);
    } catch (error) {
      help({
        displayedWhen: server && (typeof server.use !== 'function'),
        warning: 'Your server needs a `use`-method for attaching webpack middleware.',
        instruction: 'Example: `use(...options) { this.express.use(...options); }`',
        link: '/dev-toolkit#custom-server',
        error,
      });
    }

    log({ message: 'Starting your Server App…\n', useSeparator: true });
    try {
      server.start({ assets: webpackAssets });
    } catch (error) {
      help({
        displayedWhen: server && (typeof server.start !== 'function'),
        warning: 'Your server needs a `start`-method.',
        instruction: 'Example: `start({ generatedAssets }) { this.express.listen(2000); }`',
        link: '/dev-toolkit#custom-server',
        error,
      });
    }
  });
}).catch((error) => {
  help({
    displayedWhen: !pathExistsSync(serverAppEntryPoint),
    warning: 'You need a server app entry point.',
    instruction: 'Do you have the file `src/server/index.js`?',
    link: '/dev-toolkit#custom-server',
    error,
  });
});
