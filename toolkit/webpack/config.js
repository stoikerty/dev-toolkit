import plugins from './config/plugins';
import { cssHook, filesHook } from './config/extensionHooks';
import loaders, { sass, postcss, eslint } from './config/loaders';
import resolve from './config/resolve';
import resolveLoader from './config/resolveLoader';
import stats from './config/stats';

import {
  PATHS,
  vendor,
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
    path: 'empty',
    mkdirp: 'empty',
    chalk: 'empty',
    fileExists: 'empty',
  },
};
