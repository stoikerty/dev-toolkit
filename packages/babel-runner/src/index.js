import path from 'path';

module.exports = ({ babelrc, nodeHooks }) => {
  const babelConfig = path.resolve(process.cwd(), babelrc);

  // Teach Node how to use babel compilation, using babelrc config defined in root
  require('babel-register')(babelConfig);

  // Teach Node how to import other filetypes, such as .scss or .png
  if (nodeHooks) {
    require(path.resolve(process.cwd(), nodeHooks));
  }

  // Run a specified file when optional argument `--run` is given
  const options = process.argv.slice(2);
  if (options[0] === '--run') {
    require(path.resolve(process.cwd(), options[1]));
  }
};
