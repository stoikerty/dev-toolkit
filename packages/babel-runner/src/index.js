import path from 'path';
import fs from 'fs';
import { sync as fileExists } from 'file-exists';

const projectFolder = process.cwd();
const packageJsonPath = path.resolve(projectFolder, 'package.json');
const packageJson = fileExists(packageJsonPath) ? require(packageJsonPath) : {};
const pkgConfig = packageJson['babel-runner'] || {};

// Retrieve Paths for babelrc & node hooks from default locations or from package.json

export const nodeHooksPath = (() => {
  const filePath = pkgConfig.nodeHooks ? pkgConfig.nodeHooks : path.resolve(projectFolder, 'nodeHooks.js');
  return fileExists(filePath) ? filePath : null;
})();

export const babelrc = (() => {
  const defaultBabelrcJS = path.resolve(projectFolder, 'babelrc.js');
  const defaultBabelrcJson = path.resolve(projectFolder, '.babelrc');

  if (fileExists(defaultBabelrcJson)) {
    return JSON.parse(fs.readFileSync(defaultBabelrcJson, 'utf8'));
  } else if (fileExists(defaultBabelrcJS)) {
    return require(defaultBabelrcJS);
  } else if (pkgConfig.babelrc) {
    if (pkgConfig.babelrc.match('.js$')) {
      return require(pkgConfig.babelrc);
    }

    return JSON.parse(fs.readFileSync(pkgConfig.babelrc, 'utf8'));
  }

  return null;
})();

// Run babel and include node-hooks

export default ({ fileToRun } = {}) => {
  // Teach Node how to import other filetypes, such as .scss .jsx or .png
  if (nodeHooksPath) {
    require(nodeHooksPath);
  }

  // Teach Node how to use babel compilation, using explicitly specified babelrc
  if (babelrc) {
    require('babel-register')(babelrc);
  }

  if (fileToRun) {
    // rely on Node error if file doesn't exist
    require(fileToRun);
  }
};
