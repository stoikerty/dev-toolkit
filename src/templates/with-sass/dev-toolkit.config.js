const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// The hashing-convention for generated css-classes
const cssChunkNaming = '[name]__[local]___[hash:base64:5]';

// We need to define where the sass-files will be located
const projectDirectory = process.cwd();
const clientFolder = path.resolve(projectDirectory, 'src/client');
const includePaths = [clientFolder];

// Configuration needed both, for development and for generating a build
const sassLoaders = [
  `css-loader?modules&importLoaders=1&localIdentName=${cssChunkNaming}`,
  'postcss-loader',
  {
    loader: 'sass-loader',
    // Include any paths that the loader needs to know about
    options: { includePaths: includePaths },
  },
];

module.exports = {
  // Exports that are shared between this file and `nodeHooks.js`
  cssChunkNaming: cssChunkNaming,
  includePaths: includePaths,

  // Exports for dev-toolkit to pick up
  webpack: {
    rules: function(options) {
      return [
        {
          test: /\.scss$/,
          use: options.creatingBuild
            ? // Extract styles from all files found during compilation
              // Try `npm start` and then loading up your browser without javascript
              ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: sassLoaders,
              })
            : // In development, we can use loaders directly
              // NOTE: This means that on the client, the first render in the browser
              //       (before javascript is loaded) will not have styles available.
              [{ loader: 'style-loader' }].concat(sassLoaders),
        },
      ];
    },

    // Generate a single css-file on build from all extracted files
    plugins: function(options) {
      const cssFileToGenerate = options.namingConvention + '.css';
      return options.creatingBuild
        ? [new ExtractTextPlugin({ filename: cssFileToGenerate, allChunks: true })]
        : [];
    },
  },
};
