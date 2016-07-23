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

console.log([
  path.resolve(__dirname, rootForRequire),
  PATHS.clientRoot,
]);

// root: path.resolve(__dirname, rootForRequire),
// // the alias will allow us to get files relative to the `src`-folder
// // exmaple: `import { myUtil } from 'src/client/utils';`
// alias: {
//   src: 'src',
// },
// modulesDirectories: [
//   path.resolve(PATHS.clientRoot),
//   path.resolve(rootForProject, 'node_modules'),
//   path.resolve(rootForToolkit, 'node_modules'),
// ],
//
// fallback: [path.resolve(rootForToolkit, 'node_modules')],

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
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname, rootForRequire),
    // the alias will allow us to get files relative to the `src`-folder
    // exmaple: `import { myUtil } from 'src/client/utils';`
    alias: {
      src: 'src',
    },
    modulesDirectories: [
      PATHS.clientRoot,
      path.resolve(rootForProject, 'node_modules'),
      path.resolve(rootForToolkit, 'node_modules'),
    ],

    fallback: [path.resolve(rootForToolkit, 'node_modules')],
  },
  resolveLoader: {
    modulesDirectories: [
      path.resolve(rootForToolkit, 'node_modules'),
    ],
    fallback: [path.resolve(rootForToolkit, 'node_modules')],
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
