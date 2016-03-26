import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Create shared config variables
// ---
const isDev = (process.env.NODE_ENV === 'development');
const root = '../../';

const clientRoot = path.resolve(__dirname, root + 'src/client');
const PATHS = {
  clientRoot: clientRoot,
  client: path.resolve(clientRoot, 'app.js'),
  build: path.resolve(__dirname, root + 'build')
};

const cssChunkNaming = '[name]__[local]___[hash:base64:5]';
const scssConfigIncludePaths = [ PATHS.clientRoot ];

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

// -----

// Server-side rendering of scss files
// ---
import hook from 'css-modules-require-hook';
import sass from 'node-sass';

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

// -----

// Resulting webpack config
// ---

const styleLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=' + cssChunkNaming,
  'postcss-loader',
  'sass-loader'
];

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
  // Use hot-reload middleware and browsersync in development,
  // extract css into one file for production.
  plugins: isDev? [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new BrowserSyncPlugin(
      // BrowserSync options - see: http://www.browsersync.io/docs/options/
      {
        // Use http://localhost:3000/ for development, proxy Dev Server.
        host: 'localhost', port: 3000,
        proxy: 'http://localhost:2000/',
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
      // Plugin options
      {
        // Prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this.
        reload: false
      }
    ),
  ] : [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],

  // The module-loaders
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: path.resolve(__dirname, root + 'node_modules')
      },

      // Use separate style-tags for developemnt,
      // extract CSS into one file for production.
      isDev? {
        test: /\.scss$/,
        loaders : ['style-loader'].concat(styleLoaders)
      } : {
        test: /\.scss$/,
        loader : ExtractTextPlugin.extract('style-loader', styleLoaders)
      }
    ]
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

  resolve: {
    // files in these directories can be imported without a relative path
    modulesDirectories: [
      PATHS.clientRoot,
      'node_modules'
    ]
  },

  // how much information webpack should output
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  }
};
