const path = require('path');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const PATHS = {
  client: path.join(__dirname, '../src/client/app.js'),
  build: path.join(__dirname, '../build')
};

export default {
  entry: {
    client: PATHS.client
  },
  output: {
    path: PATHS.build,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, "node_modules"),
        query: {
          presets: ['es2015', 'react']
        }
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
