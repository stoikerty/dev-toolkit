import path from 'path';

export babelConfig from '../babelrc';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const devToolkitRoot = path.resolve(__dirname, '../../');
export const projectRoot = process.cwd();
export const buildFolder = path.resolve(projectRoot, 'build');
export const serverAppEntryPoint = path.resolve(projectRoot, 'src/server/index.js');

export const entryPoint = './src/client/index.js';
export const defaultPublicPath = '/';
export const publicPath = process.env.PUBLIC_PATH || defaultPublicPath;
