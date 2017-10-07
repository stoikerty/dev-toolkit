import { statSync, readdirSync } from 'fs';
import { ensureDirSync, copySync } from 'fs-extra';
import { white } from 'chalk';
import path from 'path';
import spawn from 'cross-spawn';

import {
  generatedExamples,
  generatedExamplesWithoutComments,
  defaultExample,
} from '../webpack/projectSettings';
import { log, spinner } from '../utilities';

const { example, projectName, skipComments } = global.options;

const getExamplesList = ({ folder }) => {
  const onlyDirectories = file => statSync(path.join(folder, file)).isDirectory();
  return readdirSync(generatedExamples).filter(onlyDirectories);
};
const examplesList = getExamplesList({ folder: generatedExamples });
const exampleExists = examplesList.indexOf(example) > -1;
const exampleName = exampleExists ? example : defaultExample;

if (example && !exampleExists) {
  log({ type: 'warning', message: `Example files for '${example}' don't exist.` });
  log({ message: 'You can use one of the following examples:' });
  examplesList.forEach(name => log({ message: `• ${name}` }));
  log({
    message: '\nProject will be initialized using default example files.',
    useSeparator: true,
  });
}

const inputFolder = path.resolve(
  skipComments ? generatedExamplesWithoutComments : generatedExamples,
  exampleName,
);
const projectFolder = path.resolve(process.cwd(), projectName);

ensureDirSync(projectFolder);
copySync(inputFolder, projectFolder);
log({ message: `Created project using ${white(exampleName)} example-files in:` });
log({ message: `${projectFolder}\n` });

spinner.start({ message: `Installing NPM Dependencies for ${white(projectName)}` });
spawn('npm', ['install'], { cwd: projectFolder }).on('close', code => {
  spinner.stop();

  if (code === 0) {
    log({ type: 'success', message: `Dependencies for ${projectName} have been installed.` });
    log({
      message: `Get started by running \`${white(`cd ${projectName} && npm run dev`)}\``,
      useSeparator: true,
    });
  } else {
    log({ type: 'warning', message: `Failed to install Dependencies for ${projectName}.` });
  }
});
