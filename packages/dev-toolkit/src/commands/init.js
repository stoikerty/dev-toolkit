import { statSync, readdirSync } from 'fs';
import { ensureDirSync, copySync } from 'fs-extra';
import { white } from 'chalk';
import path from 'path';
import spawn from 'cross-spawn';

import { generatedExamples, generatedExamplesWithoutComments } from '../webpack/projectSettings';
import { log, spinner } from '../utilities';

const getExamplesList = ({ folder }) => {
  const onlyDirectories = (file) => statSync(path.join(folder, file)).isDirectory();
  return readdirSync(generatedExamples).filter(onlyDirectories);
};
const examplesList = getExamplesList({ folder: generatedExamples });
const exampleExists = ({ name }) => examplesList.indexOf(name) > -1;

const { example, projectName, skipComments } = global.options;

if (exampleExists({ name: example })) {
  const inputFolder = path.resolve(
    skipComments ? generatedExamplesWithoutComments : generatedExamples,
    example,
  );
  const projectFolder = path.resolve(process.cwd(), projectName);

  ensureDirSync(projectFolder);
  copySync(inputFolder, projectFolder);
  log({ message: `Created project using ${white(example)} example files.` });

  spinner.start({ message: `Installing NPM Dependencies for ${white(projectName)}` });
  spawn('npm', ['install'], { cwd: projectFolder }).on('close', (code) => {
    spinner.stop();

    if (code === 0) {
      log({ type: 'success', message: `Dependencies for ${projectName} have been installed.` });
      log({ message: `Get started by running \`${white(`cd ${projectName} && npm run dev`)}\``, useSeparator: true });
    } else {
      log({ type: 'warning', message: `Failed to install Dependencies for ${projectName}.` });
    }
  });
} else {
  log({ type: 'warning', message: `Example files for '${example}' don't exist.` });
  log({ message: 'Use one of the following examples:' });
  examplesList.forEach((exampleName) => log({ message: `• ${exampleName}` }));
}
