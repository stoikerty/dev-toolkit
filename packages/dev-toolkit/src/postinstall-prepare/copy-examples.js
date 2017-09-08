import path from 'path';
import { ensureDirSync, copySync, removeSync, readFile, outputFile } from 'fs-extra';
import klawSync from 'klaw-sync';
import decomment from 'decomment';

import { log } from '../utilities';

log({ title: 'examples', message: 'Copy examples for dev-toolkit distribution', useSeparator: true });

const rootDir = path.resolve(__dirname, '../../../../');
const inputFolder = path.resolve(rootDir, 'examples');
const examples = path.resolve(__dirname, 'examples');
const examplesWithoutComments = path.resolve(__dirname, 'examples-no-comment');

const ignoreDevFolders = (item) =>
  (item.indexOf('node_modules') < 0) && (item.indexOf('build') < 0);

const removeDevFiles = ({ directory }) => {
  const devFiles = (item) => item && item.path && item.path.indexOf('package-lock') >= 0;
  const allFiles = klawSync(directory, { nodir: true, filter: devFiles });
  const allFilePaths = Object.keys(allFiles).map((item) => allFiles[item].path);

  allFilePaths.forEach((filePath) => {
    removeSync(filePath);
  });
};

const removeCommentsFromJSFiles = ({ directory }) => {
  const onlyJSFiles = (item) => item && item.path && path.extname(item.path) === '.js';
  const allFiles = klawSync(directory, { nodir: true, filter: onlyJSFiles });
  const allFilePaths = Object.keys(allFiles).map((item) => allFiles[item].path);

  allFilePaths.forEach((filePath) => {
    readFile(filePath, 'utf8')
      .then((data) => {
        // Uncomment files as if they were plain text files (avoiding issues with jsx)
        outputFile(filePath, decomment.text(data));
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

log({ message: 'Copying examples into dist folder...' });
removeSync(examples);
ensureDirSync(examples);
copySync(inputFolder, examples, { filter: ignoreDevFolders });
removeDevFiles({ directory: examples });

log({ message: 'Creating an examples-folder in dist that has comments stripped out...' });
removeSync(examplesWithoutComments);
ensureDirSync(examplesWithoutComments);
copySync(inputFolder, examplesWithoutComments, { filter: ignoreDevFolders });
removeDevFiles({ directory: examplesWithoutComments });
removeCommentsFromJSFiles({ directory: examplesWithoutComments });

log({ message: 'Finished examples task.', useSeparator: true });
