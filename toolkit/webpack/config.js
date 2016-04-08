import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';

//
// Webpack Configuration
// ---------------------
//
// Find the following sections below
// - Paths
// - Webpack Plugins
// - Style configuration (+ scss server side rendering)
// - Resulting Webpack config

// Paths
// ---
const isDev = (process.env.NODE_ENV === 'development');

// get user-specific configuration from `.env`
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 2000;
const PROXY_HOST = process.env.PROXY_HOST || 'localhost';
const PROXY_PORT = process.env.PROXY_PORT || 3000;
const VERBOSE_LOGGING = process.env.VERBOSE_LOGGING || false;

const root = '../../';
const clientRoot = path.resolve(__dirname, root + 'src/client');
const serverRoot = path.resolve(__dirname, root + 'src/server');

const PATHS = {
  publicFiles: path.resolve(serverRoot, 'public-files'),
  clientRoot: clientRoot,
  client: path.resolve(clientRoot, 'app.js'),
  build: path.resolve(__dirname, root + 'build')
};

// Webpack Plugins
// ---
const sharedPlugins = [
  new CopyWebpackPlugin([ { from: PATHS.publicFiles, to: 'files' } ])
];

const developmentPlugins = [
  // Use hot-reload middleware, use browsersync for development
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
      reload: false
    }
  )
];

const productionPlugins = [
  // Extract css into one file for production, minify javascript
  new ExtractTextPlugin('style.css', { allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } })
];

// Style configuration
// ---
const scssConfigIncludePaths = [ PATHS.clientRoot ];
const cssChunkNaming = '[name]__[local]___[hash:base64:5]';

const styleLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=' + cssChunkNaming,
  'postcss-loader',
  'sass-loader'
];

// Set up server-side rendering of scss files
// ---
// Implement a hook in node for `.scss`-imports that uses
// the same settings as the webpack config.
hook({
  extensions: [ '.scss' ],

  // Share naming-convention of `css-loader`
  generateScopedName: cssChunkNaming,

  // Process files with same settings as `sass-loader` and return css.
  preprocessCss: (cssFileData, cssFilePath) => {
    // Include any paths that are part of the config,
    // as well as the current path where css-file resides.
    let includePaths = [].concat(scssConfigIncludePaths);
    includePaths.push(path.dirname(cssFilePath));

    return sass.renderSync({
      data: cssFileData,
      includePaths: includePaths
    }).css;
  },
});

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry: [
    PATHS.client
  ],
  output: {
    path: PATHS.build,
    filename: 'app.js',
    publicPath: '/'
  },

  // Webpack plugins
  plugins: isDev ?
    sharedPlugins.concat(developmentPlugins)
    : sharedPlugins.concat(productionPlugins),

  // The module-loaders
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: [
          path.resolve(__dirname, root + 'src/node_modules'),
          path.resolve(__dirname, root + 'node_modules')
        ]
      },

      // Use separate style-tags for developemnt,
      // extract CSS into one file for production.
      isDev ? {
        test: /\.scss$/,
        loaders : ['style-loader'].concat(styleLoaders)
      } : {
        test: /\.scss$/,
        loader : ExtractTextPlugin.extract('style-loader', styleLoaders)
      }
    ]
  },

  // use .eslintrc file inside `src`-folder
  eslint: {
    useEslintrc: false,
    configFile: path.resolve(__dirname, root + 'src/.eslintrc')
  },

  // `sass-loader`-specific config
  sassLoader: {
    includePaths: scssConfigIncludePaths
  },

  // `postcss-loader`-specific config
  postcss: [
    // Supported Browsers via `Autoprefixer`
    // see: https://github.com/ai/browserslist
    autoprefixer({
      browsers: [
        '> 0.8%',
        'last 2 versions',
        'Explorer >= 9'
      ]
    })
  ],

  // Files in these directories can be imported without a relative path
  resolve: {
    modulesDirectories: [
      PATHS.clientRoot,
      'src/node_modules',
      'node_modules'
    ]
  },

  // how much information webpack should output
  stats: {
    colors: true,
    timings: true,
    reasons: true,

    children: VERBOSE_LOGGING,
    hash: VERBOSE_LOGGING,
    version: VERBOSE_LOGGING,
    chunks: VERBOSE_LOGGING,
    chunkModules: VERBOSE_LOGGING,
    cached: VERBOSE_LOGGING,
    cachedAssets: VERBOSE_LOGGING,
  }
};
