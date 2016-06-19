import cssHook from 'css-modules-require-hook';
import filesHook from 'files-require-hook';
import jsxHook from 'node-jsx-babel';
import sass from 'node-sass';

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

export default {
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
};
