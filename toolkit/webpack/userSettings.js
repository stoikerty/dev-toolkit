import path from 'path';

const isDev = (process.env.NODE_ENV === 'development');

export const rootForWebpack = './';
export const rootForRequire = process.cwd();

const clientRoot = path.resolve(rootForWebpack, 'src/client');
const serverRoot = path.resolve(rootForWebpack, 'src/server');
const buildFolder = path.resolve(rootForWebpack, 'build');

const pkg = require(path.resolve(rootForRequire, 'package.json')) || {}; // eslint-disable-line global-require, max-len
export const vendorModules = pkg.toolkitSettings && pkg.toolkitSettings.vendor ?
  pkg.toolkitSettings.vendor : [];

// environment variables & defaults
export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 2000,
  PROXY_HOST: process.env.PROXY_HOST || 'localhost',
  PROXY_PORT: process.env.PROXY_PORT || 3000,
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING || false,
};

export const PATHS = {
  publicFilesFolder: path.resolve(serverRoot, 'public-files'),
  manifestRootAssetPath: './src/client',
  manifest: path.resolve(buildFolder, 'manifest.json'),
  clientRoot,
  serverRoot,
  clientAppEntryPoint: path.resolve(clientRoot, 'app.js'),
  buildFolder,
};

const devNamingConvention = '[name]';
const prodNamingConvention = '[name].[chunkhash]';
export const namingConvention = isDev ? devNamingConvention : prodNamingConvention;
