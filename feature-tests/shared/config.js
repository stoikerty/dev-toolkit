import path from 'path';
import { ensureDirSync, removeSync } from 'fs-extra';
import emptyDir from 'empty-dir';
import shell from 'shelljs';

export const rootDir = path.resolve(__dirname, '../../');

const rootCacheDirectory = path.resolve(rootDir, 'feature-tests/_temp-cache');
export const createCacheDir = (name) => {
  const cacheDir = path.resolve(rootCacheDirectory, `${name}-cache`);
  ensureDirSync(cacheDir);
  shell.cd(cacheDir);

  return cacheDir;
};

export const cleanCacheDir = (name, done) => {
  const cacheDir = path.resolve(rootCacheDirectory, `${name}-cache`);
  removeSync(cacheDir);

  if (emptyDir.sync(rootCacheDirectory)) {
    removeSync(rootCacheDirectory);
  }
  done();
};
