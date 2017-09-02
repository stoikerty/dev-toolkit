import path from 'path';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const devToolkitRoot = path.resolve(__dirname, '../../');
export const projectRoot = process.cwd();
export const buildFolder = path.resolve(projectRoot, 'build');
export const serverAppEntryPoint = path.resolve(projectRoot, 'src/server/index.js');

export const assetsFolder = path.resolve(devToolkitRoot, 'dist');
export const assetsManifestName = 'assets-manifest.json';
export const assetsManifestFile = path.resolve(assetsFolder, assetsManifestName);

export const entryPoint = './src/client/index.js';
export const defaultPublicPath = '/';
export const publicPath = process.env.PUBLIC_PATH || defaultPublicPath;
