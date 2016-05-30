import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import hook from 'css-modules-require-hook';
import fileshook from 'files-require-hook';
import sass from 'node-sass';

//
// Webpack Configuration
// ---------------------
//
// Find the following sections below
// - Paths
// - User-specific Package settings
// - Webpack Plugins
// - Style configuration (+ scss server side rendering)
// - Resulting Webpack config

// Paths
// ---
const isDev = (process.env.NODE_ENV === 'development');

global.settings = {
  usesServerRendering : process.env.SERVER_RENDERING || true,
  isDev,
}

// get user-specific configuration from `.env`
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 2000;
const PROXY_HOST = process.env.PROXY_HOST || 'localhost';
const PROXY_PORT = process.env.PROXY_PORT || 3000;
const VERBOSE_LOGGING = process.env.VERBOSE_LOGGING || false;

const root = process.env.UDT_APP_PATH;
const UDTroot = process.env.UDT_ROOT;
const clientRoot = path.join(root, '/src/client');
const serverRoot = path.join(root, '/src/server');

const PATHS = {
  publicFiles: path.join(serverRoot, '/public-files'),
  clientRoot: clientRoot,
  client: path.join(clientRoot, '/app.js'),
  build: path.join(root, '/build')
};

console.log('PATHS: ', PATHS);

// User-specific Package settings
// ---
const pkg = require(path.join(root, '/package.json')) || {};
const vendor = pkg.toolkitSettings && pkg.toolkitSettings.vendor ?
  pkg.toolkitSettings.vendor : [];

// Webpack Plugins
// ---
const sharedPlugins = [
  new CopyWebpackPlugin([ { from: PATHS.publicFiles, to: 'files' } ]),
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
  }),
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
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),

  // Extract css into one file for production, minify javascript
  new ExtractTextPlugin('[name].[chunkhash].css', { allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  new HtmlWebpackPlugin({
    inject: false,
    template: path.join(root, '/src/server/views/layout.hbs'),

    reactHtml: '',
    isDev,
    creatingBuild: true,
  }),
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

// Set up server-side rendering of image files
// ---
// Implement a hook that uses a file-path for node
// NOTE:
//   For the build-process it is likely that the files should first
//   be copied into the build dir and then referenced from there instead of
//   using the original file-path. Similar to `webpack-isomorphic-tools`.
//   see: https://github.com/halt-hammerzeit/webpack-isomorphic-tools#getting-down-to-business
fileshook({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  base: root,
});

// Resulting webpack config
// ---
export default {
  // The entry and ouput configuration for the bundle(s)
  entry: {
    app: [PATHS.client],
    vendor: vendor,
  },
  output: {
    path: PATHS.build,
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[chunkhash].js',
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
        test: /\.js?$/,
        loaders: [
          'babel-loader',
          // TODO: fix eslint issue
          'eslint-loader'
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
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
    configFile: path.join(root, '/.eslintrc')
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
      path.join(root, '/node_modules'),
      path.join(UDTroot, '/node_modules')
    ],

    fallback: [ path.join(UDTroot, '/node_modules') ]
  },
  resolveLoader: {
    modulesDirectories: [
      path.join(UDTroot, '/node_modules')
    ],
    fallback: [ path.join(UDTroot, '/node_modules') ]
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
