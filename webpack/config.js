import path from 'path';
import webpack from 'webpack';


import register from 'ignore-styles';
register(['.scss']);

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const clientRoot = path.resolve(__dirname, '../src/client');
const PATHS = {
  clientRoot: clientRoot,
  client: path.resolve(clientRoot, 'app.js'),
  build: path.resolve(__dirname, '../build')
};

export default {
  // target: 'node',
  // context: path.resolve(__dirname, '../src/client'),
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    PATHS.client
  ],
  output: {
    path: PATHS.build,
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // ,
    // new webpack.IgnorePlugin(/\.scss$/),
    // new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.scss$/,
        loaders: [
          // 'null-loader',
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  // allow loading of scss files using client-path
  sassLoader: {
    includePaths: [ PATHS.clientRoot ]
  },

  resolve: {
    modulesDirectories: [
      PATHS.clientRoot,
      'node_modules'
    ]
  },

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
