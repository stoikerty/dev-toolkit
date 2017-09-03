import path from 'path';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const devToolkitRoot = path.resolve(__dirname, '../../');
export const projectRoot = process.cwd();
export const buildFolder = path.resolve(projectRoot, 'build');
export const serverAppEntryPoint = path.resolve(projectRoot, 'src/server/index.js');

export const assetsManifestFolder = path.resolve(devToolkitRoot, 'dist');
export const assetsManifestName = 'assets-manifest.json';
export const assetsManifestFile = path.resolve(assetsManifestFolder, assetsManifestName);

export const entryPoint = './src/client/index.js';
// Make sure leading slash & trailing slash is present (otherwise source-map won't work)
export const publicPath = (process.env.ASSETS_PATH || '/assets').replace(/^\/?/, '/').replace(/\/?$/, '/');
// Remove leading slash from public path to create correct file-path
export const assetsPath = path.resolve(buildFolder, publicPath.replace(/^\//, ''));
