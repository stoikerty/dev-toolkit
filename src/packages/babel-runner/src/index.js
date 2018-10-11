import path from 'path';
import { sync as fileExists } from 'file-exists';

const projectFolder = process.cwd();
const packageJsonPath = path.resolve(projectFolder, 'package.json');
const packageJson = fileExists(packageJsonPath) ? require(packageJsonPath) : {};
const pkgConfig = packageJson['babel-runner'] || {};

// Retrieve Paths for babelrc & node hooks from default locations or from package.json
const nodeHooksPath = (() => {
  const filePath = pkgConfig.nodeHooks
    ? pkgConfig.nodeHooks
    : path.resolve(projectFolder, 'nodeHooks.js');
  return fileExists(filePath) ? filePath : null;
})();
const babelrc = (() => {
  const defaultBabelrcJS = path.resolve(projectFolder, 'babelrc.js');
  const defaultBabelrcJson = path.resolve(projectFolder, '.babelrc');

  if (fileExists(defaultBabelrcJson)) {
    // No need to read the file, we can use babel-register's automatic `.babelrc`-finding "feature"
    return {};
  } else if (fileExists(defaultBabelrcJS)) {
    // We read a file which expects all presets & plugins to be resolved with `require.resolve`
    return require(defaultBabelrcJS);
  } else if (
    pkgConfig.babelrc &&
    pkgConfig.babelrc.match('.js$') &&
    fileExists(pkgConfig.babelrc)
  ) {
    // Use the `babelrc.js`-file defined in package.json
    return require(pkgConfig.babelrc);
  }

  return null;
})();

// Run babel and include node-hooks
const babelRunner = ({ fileToRun } = {}) => {
  // Teach Node how to import other filetypes, such as .scss .jsx or .png
  if (nodeHooksPath) {
    require(nodeHooksPath);
  }

  // Teach Node how to use babel compilation, using explicitly specified babelrc
  if (babelrc) {
    require('@babel/register')(babelrc);
  }

  if (fileToRun) {
    // rely on Node error if file doesn't exist
    require(path.resolve(process.cwd(), fileToRun));
  }
};

module.exports = babelRunner;
module.exports.default = babelRunner;
module.exports.babelrc = babelrc;
