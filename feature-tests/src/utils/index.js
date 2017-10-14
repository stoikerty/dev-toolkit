import path from 'path';
import { ensureDirSync, removeSync } from 'fs-extra';
import shell from 'shelljs';

// Create empty cache-directory for running tests
export const rootDir = path.resolve(process.cwd(), '../');
export const cacheDir = path.resolve(rootDir, 'feature-tests/__temp-cache');
export const createCacheDir = done => {
  ensureDirSync(cacheDir);
  shell.cd(cacheDir);
  done();
};

export const cleanCacheDir = done => {
  removeSync(cacheDir);
  done();
};

export const runDevToolkitCli = ({ command, directory } = { directory: cacheDir }) =>
  new Promise((resolve, reject) => {
    try {
      shell.exec(`cd ${directory}`, { silent: true });
      shell.exec(
        `./node_modules/.bin/dev-toolkit ${command}`,
        { silent: true },
        (exitCode, output) => resolve({ exitCode, output }),
      );
    } catch (e) {
      console.log('Unable to runDevToolkitCli. ', e);
      reject(e);
    }
  });
