import path from 'path';
import cssHook from 'css-modules-require-hook';
import sass from 'node-sass';

import {
  PATHS,
  cssChunkNaming,
} from '../../../_userSettings';

// Set up server-side rendering of scss files
// ---
// Implement a hook in node for `.scss`-imports that uses
// the same settings as the webpack config.
const preprocessCss = (cssFileData, cssFilePath) => {
  // Include any paths that are part of the config,
  // as well as the current path where css-file resides.
  const includePaths = [].concat(PATHS.scssIncludePaths);
  includePaths.push(path.dirname(cssFilePath));

  return sass.renderSync({
    data: cssFileData,
    includePaths,
  }).css;
};

export default () => {
  // Allow vanilla css-modules
  cssHook({
    extensions: ['.css'],

    // Share naming-convention of `css-loader`
    generateScopedName: cssChunkNaming,
  });

  // Separate processing for scss
  cssHook({
    extensions: ['.scss'],

    // Share naming-convention of `css-loader`
    generateScopedName: cssChunkNaming,

    // Process files with same settings as `sass-loader` and return css.
    preprocessCss,
  });
};
