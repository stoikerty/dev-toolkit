import path from 'path';
import { pathExistsSync } from 'fs-extra';

import { projectRoot } from '../webpack/projectSettings';
import { help, log, bootstrap } from '../utilities';

bootstrap({ skipServerImport: true }).then(() => {
  // eslint-disable-next-line no-underscore-dangle
  const file = global.__devToolkitCommandOptions.file || false;

  if (file && typeof file === 'string') {
    log({ message: 'Import your file…\n', useSeparator: true });
    const pathName = path.resolve(projectRoot, file);

    import(pathName).catch(error => {
      help({
        displayedWhen: file && !pathExistsSync(pathName),
        warning: `File '${file}' doesn't exist.`,
        error,
      });
    });
  }
});
