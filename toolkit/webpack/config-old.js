import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import cssHook from 'css-modules-require-hook';
import filesHook from 'files-require-hook';
import jsxHook from 'node-jsx-babel';
import sass from 'node-sass';

import ManifestRevisionPlugin from 'manifest-revision-webpack-plugin';

//
// Webpack Configuration
// ---------------------
//
// Find the following sections below
// - Environment variables
// - Paths
// - Webpack Plugins
// - Style configuration
// - server-side rendering for scss files
// - server-side rendering for image files
// - server-side rendering of jsx files
// - User-specific Package settings
// - Resulting Webpack config
//

// Set up dev global
global.isDev = (process.env.NODE_ENV === 'development');
const isDev = global.isDev;

// Environment variables
// ---

if (!process.env.API_DOMAIN) {
  throw Error('please set env variable for API_DOMAIN like //<ip>:<port>');
  // e.g. API_DOMAIN=//10.10.10.10:8000 npm run dev
}

const HOST = 'localhost' || process.env.HOST;
const PORT = 2000 || process.env.PORT;
const PROXY_HOST = 'localhost' || process.env.PROXY_HOST;
const PROXY_PORT = 3000 || process.env.PROXY_PORT;
const VERBOSE_LOGGING = false || process.env.VERBOSE_LOGGING;

// Paths
// ---

// get user-specific configuration from `.env`
const root = '../../';
const clientRoot = path.resolve(__dirname, `${root}src/client`);
const serverRoot = path.resolve(__dirname, `${root}src/server`);

export const PATHS = {
  publicFiles: path.resolve(serverRoot, 'public-files'),
  rootAssetPath: './src/client',
  manifest: path.resolve(__dirname, `${root}build`, 'manifest.json'),
  clientRoot,
  client: path.resolve(clientRoot, 'app.jsx'),
  build: path.resolve(__dirname, `${root}build`),
};

// Webpack Plugins
// ---
const devNamingConvention = '[name]';
const prodNamingConvention = '[name].[chunkhash]';
const namingConvention = isDev ? devNamingConvention : prodNamingConvention;

const sharedPlugins = [
  new ProgressBarPlugin({ width: 40 }),
  new webpack.optimize.CommonsChunkPlugin('vendor', `${namingConvention}.js`),
  new CopyWebpackPlugin([{ from: PATHS.publicFiles }]),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // for redux only
    buildSettings: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_DOMAIN: JSON.stringify(process.env.API_DOMAIN),
        COOKIE_DOMAIN: JSON.stringify(process.env.COOKIE_DOMAIN),
      },
    },
  }),
];

const developmentPlugins = [
  // Use hot-reload middleware, browsersync for development
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),

  new BrowserSyncPlugin(
    {
      // BrowserSync options - see: http://www.browsersync.io/docs/options/

      // Use http://localhost:3000/ for development, proxy Dev Server.
      host: PROXY_HOST, port: PROXY_PORT,
      proxy: `http://${HOST}:${PORT}/`,
      // Stop the browser from automatically opening.
      open: false,
      // Scrolls & Form inputs on any device will be mirrored to all others.
      ghostMode: {
        clicks: false,
        scroll: true,
        forms: true,
      },
      // Show what browsers are connected.
      logConnections: true,
    },
    {
      // Webpack Plugin options

      // Prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this.
      reload: false,
    }
  ),
];

const productionPlugins = [
  // Extract css into one file for production, minify javascript
  new ExtractTextPlugin(`${prodNamingConvention}.css`, { allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  new HtmlWebpackPlugin({
    inject: false,
    template: 'src/server/views/layout.hbs',

    reactHtml: '',
    isDev,
    creatingBuild: true,
    segmentProjectId: process.env.SEGMENT_PROJECT_ID,
  }),
  new ScriptExtHtmlWebpackPlugin({
    async: ['app'],
    defer: ['app'],
    defaultAttribute: 'sync',
  }),
  new ManifestRevisionPlugin(
    PATHS.manifest,
    {
      rootAssetPath: PATHS.rootAssetPath,
      ignorePaths: [],
      extensionsRegex: /\.(jpe?g|png|gif|svg)$/i,
    }
  ),
];

if (process.env.COMPRESS) {
  productionPlugins.push(
    new CompressionPlugin({
      asset: '[path]',
      test: new RegExp(process.env.GZIP_UPLOAD_PATTERN),
      minRatio: 0,
    })
  );
}

// Style configuration
// ---
const scssConfigIncludePaths = [PATHS.clientRoot];
const cssChunkNaming = '[name]__[local]___[hash:base64:5]';

const styleLoaders = [
  `css-loader?modules&importLoaders=1&localIdentName=${cssChunkNaming}`,
  'postcss-loader',
  'sass-loader',
];

// Set up server-side rendering of scss files
// ---
// Implement a hook in node for `.scss`-imports that uses
// the same settings as the webpack config.
const preprocessCss = (cssFileData, cssFilePath) => {
  // Include any paths that are part of the config,
  // as well as the current path where css-file resides.
  const includePaths = [].concat(scssConfigIncludePaths);
  includePaths.push(path.dirname(cssFilePath));

  return sass.renderSync({
    data: cssFileData,
    includePaths,
  }).css;
};
cssHook({
  extensions: ['.scss'],

  // Share naming-convention of `css-loader`
  generateScopedName: cssChunkNaming,

  // Process files with same settings as `sass-loader` and return css.
  preprocessCss,
});

// Set up server-side rendering of image files
// ---
// Implement a hook that uses a file-path for node
// NOTE:
//   For the build-process it is likely that the files should first
//   be copied into the build dir and then referenced from there instead of
//   using the original file-path. Similar to `webpack-isomorphic-tools`.
//   see: https://github.com/halt-hammerzeit/webpack-isomorphic-tools#getting-down-to-business
filesHook({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  base: process.cwd(),
});

// Set up server-side rendering for jsx-files
// ---
jsxHook.install();

// User-specific Package settings
// ---
const pkg = require(path.join(projectRootRequire, '/package.json')) || {};
const vendor = pkg.toolkitSettings && pkg.toolkitSettings.vendor ?
  pkg.toolkitSettings.vendor : [];

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry: {
    app: [PATHS.client],
    vendor,
  },
  output: {
    path: PATHS.build,
    filename: `${namingConvention}.js`,
    chunkFilename: `${namingConvention}.js`,
    publicPath: '/',
  },

  // Webpack plugins
  plugins: isDev ?
    sharedPlugins.concat(developmentPlugins)
    : sharedPlugins.concat(productionPlugins),

  // The module-loaders
  module: {
    loaders: [
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader',
          'eslint-loader',
        ],
        exclude: isDev ? /(node_modules)/ : /(node_modules)|\.dynamic.jsx?$/,
      },
      // Only use dynamic loading when creating a client-bundle since it breaks hot-reload.
      isDev ? {
        loaders: [],
      } : {
        test: /\.dynamic.jsx?$/,
        loaders: [
          // The`bundle`-loader automatically uses module directly when code is run on the server
          'bundle?lazy&name=[name]',
          'babel-loader',
          'eslint-loader',
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },

      // Use separate style-tags for development,
      // extract CSS into one file for production.
      isDev ? {
        test: /\.scss$/,
        loaders: ['style-loader'].concat(styleLoaders),
      } : {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', styleLoaders),
      },
    ],
  },

  // use .eslintrc file inside `src`-folder
  eslint: {
    useEslintrc: false,
    configFile: path.resolve(__dirname, `${root}.eslintrc`),

    // Override any settings from the configFile
    rules: isDev ? {
      'no-debugger': [
        'warn',
      ],
    } : {},
  },

  // `sass-loader`-specific config
  sassLoader: {
    includePaths: scssConfigIncludePaths,
  },

  // `postcss-loader`-specific config
  postcss: [
    // Supported Browsers via `Autoprefixer`
    // see: https://github.com/ai/browserslist
    autoprefixer({
      browsers: [
        '> 0.8%',
        'last 2 versions',
        'Explorer >= 9',
      ],
    }),
  ],

  // Files in these directories can be imported without a relative path
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      PATHS.clientRoot,
      'src/node_modules',
      'node_modules',
    ],
  },

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
