import ExtractTextPlugin from 'extract-text-webpack-plugin';

import {
  currentScript,
  babelConfig,
  eslintConfig,
  cssChunkNaming,
} from '../../_userSettings';

// Style configuration
// ---
const styleLoaders = [
  `css-loader?modules&importLoaders=1&localIdentName=${cssChunkNaming}`,
  'postcss-loader',
];
const sassLoaders = styleLoaders.concat(['sass-loader']);

export eslint from './loaders/eslint';
export postcss from './loaders/postcss';
export sass from './loaders/sass';

export default [
  { test: /\.hbs$/, loader: 'handlebars-loader' },
  { test: /\.json$/, loader: 'json-loader' },
  {
    test: /\.jsx?$/,
    loaders: [
      `babel-loader?${JSON.stringify(babelConfig)}`,
      `eslint-loader?${JSON.stringify(eslintConfig)}`,
    ],
    exclude: /(node_modules)|\.route.jsx?$|\.dynamic.jsx?$/,
  },
  {
    test: /\.route.jsx?$|\.dynamic.jsx?$/,
    loaders: [
      // The`bundle`-loader automatically uses module directly when code is run on the server
      'bundle?lazy&name=[name]',
      `babel-loader?${JSON.stringify(babelConfig)}`,
      `eslint-loader?${JSON.stringify(eslintConfig)}`,
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
  currentScript === 'watch' ? {
    test: /\.css$/,
    loaders: ['style-loader'].concat(styleLoaders),
  } : {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', styleLoaders),
  },
  // Also allow css to be used
  currentScript === 'watch' ? {
    test: /\.scss$/,
    loaders: ['style-loader'].concat(sassLoaders),
  } : {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', sassLoaders),
  },
];
