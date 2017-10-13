// This file runs before `babel-register`, before node knows about `.babelrc`,
// therefore it needs to be written in ES5.
const cssHook = require('css-modules-require-hook');
const path = require('path');
const sass = require('node-sass');

// Retrieve settings that are shared between node-hooks and webpack
const scssIncludePaths = require('./dev-toolkit.config').scssIncludePaths;
const cssChunkNaming = require('./dev-toolkit.config').cssChunkNaming;

// Make node understand sass-files by hooking into the file extension
cssHook({
  extensions: ['.scss'],

  // Share the same naming-convention of `css-loader`
  generateScopedName: cssChunkNaming,

  // Process files with same settings as `sass-loader` and return css.
  preprocessCss: (cssFileData, cssFilePath) => {
    return sass.renderSync({
      data: cssFileData,
      // Include any paths that are part of the config,
      // as well as the current path where css-file resides.
      includePaths: [].concat(scssIncludePaths).concat([path.dirname(cssFilePath)]),
    }).css;
  },
});
