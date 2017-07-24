import path from 'path';

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const projectRoot = process.cwd();
export const buildFolder = path.resolve(projectRoot, 'build');
export const serverAppEntryPoint = path.join(projectRoot, 'src/server/index.js');

export const entryPoint = './src/client/index.js';
export const defaultPublicPath = '/';
export const publicPath = process.env.PUBLIC_PATH || defaultPublicPath;

export const namingConvention = isDev ? '[name]' : '[name].[chunkhash]';
