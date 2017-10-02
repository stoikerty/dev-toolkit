import path from 'path';
import { ensureDirSync, copySync, removeSync, readFile, outputFile } from 'fs-extra';
import klawSync from 'klaw-sync';
import decomment from 'decomment';

import {
  originalExamples,
  generatedExamples,
  generatedExamplesWithoutComments,
} from '../webpack/projectSettings';
import { log } from '../utilities';

log({ title: 'prepare', message: 'Copy examples into dev-toolkit distribution', useSeparator: true });

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
removeSync(generatedExamples);
ensureDirSync(generatedExamples);
copySync(originalExamples, generatedExamples, { filter: ignoreDevFolders });
removeDevFiles({ directory: generatedExamples });

log({ message: 'Creating an examples-folder in dist that has comments stripped out...' });
removeSync(generatedExamplesWithoutComments);
ensureDirSync(generatedExamplesWithoutComments);
copySync(originalExamples, generatedExamplesWithoutComments, { filter: ignoreDevFolders });
removeDevFiles({ directory: generatedExamplesWithoutComments });
removeCommentsFromJSFiles({ directory: generatedExamplesWithoutComments });

log({ message: 'Finished examples task\n', useSeparator: true });
