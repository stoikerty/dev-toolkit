import path from 'path';
import webpack from 'webpack';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const PATHS = {
  client: path.join(__dirname, '../src/client/app.js'),
  build: path.join(__dirname, '../build')
};

export default {
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, "../node_modules")
      }
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
