import plugins from './config/plugins';
import loaders, { sassLoader, postcss } from './config/loaders';
// import eslint from './config/eslint';

import path from 'path';

import {
  isDev,
  PATHS,
  env,
  vendorModules,
  namingConvention,
  rootForProject,
  rootForRequire,
  rootForToolkit,
} from '../_userSettings';

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry: {
    app: [PATHS.clientAppEntryPoint],
    vendor: vendorModules,
  },

  output: {
    path: PATHS.buildFolder,
    filename: `${namingConvention}.js`,
    chunkFilename: `${namingConvention}.js`,
    publicPath: '/',
  },

  // Webpack plugins
  plugins,

  // The module-loaders
  module: {
    loaders,
  },

  // use .eslintrc file inside `src`-folder
  eslint: {
    useEslintrc: false,
    configFile: path.resolve(rootForRequire, '.eslintrc'),

    // Override any settings from the configFile
    rules: isDev ? {
      'no-debugger': [
        'warn',
      ],
    } : {},
  },

  // `sass-loader`-specific config
  sassLoader,

  // `postcss-loader`-specific config
  postcss,

  // Files in these directories can be imported without a relative path
  resolve: {
    modulesDirectories: [
      PATHS.clientRoot,
      path.join(rootForProject, '/node_modules'),
      path.join(rootForToolkit, '/node_modules'),
    ],

    fallback: [path.join(rootForToolkit, '/node_modules')],
  },
  resolveLoader: {
    modulesDirectories: [
      path.join(rootForToolkit, '/node_modules'),
    ],
    fallback: [path.join(rootForToolkit, '/node_modules')],
  },

  // how much information webpack should output
  stats: {
    colors: true,
    timings: true,
    reasons: true,

    assets: env.VERBOSE_LOGGING,
    modules: env.VERBOSE_LOGGING,
    source: env.VERBOSE_LOGGING,
    errorDetails: env.VERBOSE_LOGGING,
    children: env.VERBOSE_LOGGING,
    hash: env.VERBOSE_LOGGING,
    version: env.VERBOSE_LOGGING,
    chunks: env.VERBOSE_LOGGING,
    chunkModules: env.VERBOSE_LOGGING,
    cached: env.VERBOSE_LOGGING,
    cachedAssets: env.VERBOSE_LOGGING,
  },
};
