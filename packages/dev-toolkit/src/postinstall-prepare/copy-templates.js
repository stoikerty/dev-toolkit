import path from 'path';
import { ensureDirSync, copySync, removeSync, readFile, outputFile } from 'fs-extra';
import klawSync from 'klaw-sync';
import decomment from 'decomment';

import {
  originalTemplates,
  generatedTemplates,
  generatedTemplatesWithoutComments,
} from '../webpack/projectSettings';
import { log } from '../utilities';

log({
  title: 'prepare',
  message: 'Copy templates into dev-toolkit distribution',
  useSeparator: true,
});

const ignoreDevFolders = item => item.indexOf('node_modules') < 0 && item.indexOf('build') < 0;

const removeDevFiles = ({ directory }) => {
  const devFiles = item => item && item.path && item.path.indexOf('package-lock') >= 0;
  const allFiles = klawSync(directory, { nodir: true, filter: devFiles });
  const allFilePaths = Object.keys(allFiles).map(item => allFiles[item].path);

  allFilePaths.forEach(filePath => {
    removeSync(filePath);
  });
};

const removeCommentsFromJSFiles = ({ directory }) => {
  const onlyJSFiles = item => item && item.path && path.extname(item.path) === '.js';
  const allFiles = klawSync(directory, { nodir: true, filter: onlyJSFiles });
  const allFilePaths = Object.keys(allFiles).map(item => allFiles[item].path);

  allFilePaths.forEach(filePath => {
    readFile(filePath, 'utf8')
      .then(data => {
        // Uncomment files as if they were plain text files (avoiding issues with jsx)
        outputFile(filePath, decomment.text(data));
      })
      .catch(err => {
        console.error(err);
      });
  });
};

log({ message: 'Copying templates into dist folder...' });
removeSync(generatedTemplates);
ensureDirSync(generatedTemplates);
copySync(originalTemplates, generatedTemplates, { filter: ignoreDevFolders });
removeDevFiles({ directory: generatedTemplates });

log({ message: 'Creating an templates-folder in dist that has comments stripped out...' });
removeSync(generatedTemplatesWithoutComments);
ensureDirSync(generatedTemplatesWithoutComments);
copySync(originalTemplates, generatedTemplatesWithoutComments, { filter: ignoreDevFolders });
removeDevFiles({ directory: generatedTemplatesWithoutComments });
removeCommentsFromJSFiles({ directory: generatedTemplatesWithoutComments });

log({ message: 'Finished templates task\n', useSeparator: true });
