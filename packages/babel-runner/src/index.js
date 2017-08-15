import path from 'path';
import { sync as fileExists } from 'file-exists';

const projectFolder = process.cwd();
const defaultBabelrcJson = path.resolve(projectFolder, 'babelrc.json');
const defaultBabelrcJS = path.resolve(projectFolder, 'babelrc.js');
const defaultNodeHooks = path.resolve(projectFolder, 'nodeHooks.js');

export default ({ babelrc, nodeHooks, fileToRun } = {}) => {
  // Teach Node how to import other filetypes, such as .scss .jsx or .png
  if (nodeHooks && fileExists(nodeHooks)) {
    require(nodeHooks);
  } else if (fileExists(defaultNodeHooks)) {
    require(defaultNodeHooks);
  }

  // Teach Node how to use babel compilation, using explicitly specified babelrc
  if (babelrc && fileExists(babelrc)) {
    require('babel-register')(require(babelrc));
  } else if (fileExists(defaultBabelrcJson)) {
    require('babel-register')(defaultBabelrcJson);
  } else if (fileExists(defaultBabelrcJS)) {
    require('babel-register')(require(defaultBabelrcJS));
  }

  if (fileToRun) {
    // rely on Node error if file doesn't exist
    require(fileToRun);
  }
};
