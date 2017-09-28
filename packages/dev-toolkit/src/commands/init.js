import { log } from '../utilities';

console.log('');
log({ type: 'warning', message: 'init command isn\'t finished yet' });
log({ message: '\nFor now, copy boilerplate files manually from...' });
log({ message: '(global path).../node_modules/dev-toolkit/dist/postinstall-prepare/examples' });
log({ message: '\nor alternatively (for files without comments) copy from...' });
log({ message: '(global path).../node_modules/dev-toolkit/dist/postinstall-prepare/examples-no-comment\n' });

// import path from 'path';
// import { ensureDirSync, copySync } from 'fs-extra';

// ensureDirSync(examples);
// copySync(inputFolder, examples, { filter: ignoreDevFolders });
