import entry from './config/entry';
import output from './config/output';
import plugins from './config/plugins';
import loaders from './config/loaders';
import eslint from './config/eslint';
import sassLoader from './config/sassLoader';
import postcss from './config/postcss';
import resolve from './config/resolve';

const VERBOSE_LOGGING = false || process.env.VERBOSE_LOGGING;

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry,
  output,

  // Webpack plugins
  plugins,

  // The module-loaders
  module: {
    loaders,
  },

  // use .eslintrc file inside `src`-folder
  eslint,

  // `sass-loader`-specific config
  sassLoader,

  // `postcss-loader`-specific config
  postcss,

  // Files in these directories can be imported without a relative path
  resolve,

  // how much information webpack should output
  stats: {
    colors: true,
    timings: true,
    reasons: true,

    assets: VERBOSE_LOGGING,
    modules: VERBOSE_LOGGING,
    source: VERBOSE_LOGGING,
    errorDetails: VERBOSE_LOGGING,
    children: VERBOSE_LOGGING,
    hash: VERBOSE_LOGGING,
    version: VERBOSE_LOGGING,
    chunks: VERBOSE_LOGGING,
    chunkModules: VERBOSE_LOGGING,
    cached: VERBOSE_LOGGING,
    cachedAssets: VERBOSE_LOGGING,
  },
};
