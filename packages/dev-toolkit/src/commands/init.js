import { statSync, readdirSync } from 'fs';
import { ensureDirSync, copySync } from 'fs-extra';
import { white } from 'chalk';
import path from 'path';
import spawn from 'cross-spawn';

import {
  generatedTemplates,
  generatedTemplatesWithoutComments,
  defaultTemplate,
} from '../webpack/projectSettings';
import { log, spinner } from '../utilities';

/* eslint-disable no-underscore-dangle */
const template = global.__devToolkitCommandOptions.template || '';
const projectName = global.__devToolkitCommandOptions.projectName || 'my_app';
const skipComments = global.__devToolkitCommandOptions.skipComments || false;

const getTemplatesList = ({ folder }) => {
  const onlyDirectories = file => statSync(path.join(folder, file)).isDirectory();
  return readdirSync(generatedTemplates).filter(onlyDirectories);
};
const templatesList = getTemplatesList({ folder: generatedTemplates });
const templateExists = templatesList.indexOf(template) > -1;
const templateName = templateExists ? template : defaultTemplate;
const isDefaultTemplate = templateName === defaultTemplate;

if (template && !templateExists) {
  log({ type: 'warning', message: `template files for '${template}' don't exist.` });
  log({ message: 'You can use one of the following templates:' });
  templatesList.forEach(name => log({ message: `• ${name}` }));
  log({
    message: `\nProject will be initialized using default template files (${defaultTemplate}).`,
    useSeparator: true,
  });
}

const inputFolder = path.resolve(
  skipComments ? generatedTemplatesWithoutComments : generatedTemplates,
  templateName
);
const projectFolder = path.resolve(process.cwd(), projectName);

ensureDirSync(projectFolder);
copySync(inputFolder, projectFolder);
log({ message: `Created project using ${white(templateName)} template in:` });
log({ message: `${projectFolder}\n` });

if (isDefaultTemplate) {
  spinner.start({ message: `Installing NPM Dependencies for ${white(projectName)}` });
} else {
  log({ message: `Installing NPM Dependencies for ${white(projectName)}…\n` });
}

const spawnOptions = isDefaultTemplate
  ? { cwd: projectFolder }
  : {
      cwd: projectFolder,
      detached: true,
      stdio: 'inherit',
    };

spawn('npm', ['install'], spawnOptions).on('close', code => {
  if (isDefaultTemplate) {
    spinner.stop();
  } else {
    log({ message: ' ' });
  }

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
