import plugins from './config/plugins';
import { cssHook, filesHook } from './config/extensionHooks';
import loaders, { sass, postcss, eslint } from './config/loaders';
import resolve from './config/resolve';
import resolveLoader from './config/resolveLoader';
import stats from './config/stats';

import {
  PATHS,
  vendor,
  overrideConfig,
  namingConvention,
} from '../_userSettings';

// Set up server-rendering for file-extensions
cssHook();
filesHook();

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry: {
    app: [PATHS.clientAppEntryPoint],
    vendor,
  },
  output: {
    path: PATHS.buildFolder,
    filename: `${namingConvention}.js`,
    chunkFilename: `${namingConvention}.js`,
    publicPath: PATHS.publicPath,
  },

  // Webpack plugins
  plugins,

  // Webpack module-loaders
  module: { loaders },

  // Specific config for loaders. `sass-loader`, `postcss-loader`, `eslint-loader`
  sassLoader: sass,
  postcss,
  eslint,

  //  Manage directories for dependencies with `resolve` & `resolveLoader`
  resolve,
  resolveLoader,

  // How much information webpack should output
  stats,

  // Ignore some node-specific packages on the client
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    path: 'empty',
    chalk: 'empty',
    mkdirp: 'empty',
    fileExists: 'empty',
  },

  // NOTE: There's limited support for using these custom config escape hatches. You're on your own!
  //   This is an escape-hatch for overriding the webpack config with your custom one.
  ...(overrideConfig.default ? overrideConfig.default : overrideConfig),
};
