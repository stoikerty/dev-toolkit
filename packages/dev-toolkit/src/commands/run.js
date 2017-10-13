import path from 'path';
import { pathExistsSync } from 'fs-extra';
import babelRunner from 'babel-runner';

import { projectRoot } from '../webpack/projectSettings';
import { help, log, bootstrap } from '../utilities';

bootstrap({ skipServerImport: true }).then(() => {
  // eslint-disable-next-line no-underscore-dangle
  const fileName = global.__devToolkitCommandOptions.fileName || '';

  log({ message: 'Importing your file…\n', useSeparator: true });
  const pathName = path.resolve(projectRoot, fileName);

  try {
    babelRunner({ fileToRun: pathName });
  } catch (error) {
    help({
      displayedWhen: fileName && !pathExistsSync(pathName),
      warning: `File '${fileName}' doesn't exist.`,
      error,
    });
  }
});
