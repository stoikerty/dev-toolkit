import fs from 'fs';
import path from 'path';
import fileExists from 'file-exists';

import debug from './utils/debug';

export const currentScript = global.toolkitScript;
debug('currentScript', currentScript);

export const scriptOptions = global.scriptOptions || {};
debug('scriptOptions', scriptOptions);

export const rootForProject = './';
debug('rootForProject', rootForProject);

export const rootForRequire = process.cwd();
debug('rootForRequire', rootForRequire);

export const rootForToolkit = path.resolve(__dirname, '../');
debug('rootForToolkit', rootForToolkit);

// eslint-disable-next-line global-require
const pkg = require(path.resolve(rootForRequire, 'package.json')) || {};
export const vendor = pkg.toolkitSettings && pkg.toolkitSettings.vendor ?
  pkg.toolkitSettings.vendor : [];
debug('vendor', vendor);

// eslint-disable-next-line global-require
export const babelConfig = require(path.resolve(__dirname, '../babelrc.js'));

const eslintProjectConfig = path.resolve(rootForProject, '.eslintrc');
// eslint-disable-next-line global-require
export const eslintConfig = JSON.parse(fs.readFileSync(eslintProjectConfig, 'utf8'));

// environment variables & defaults
export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 2000,
  BROWSERSYNC_HOST: process.env.BROWSERSYNC_HOST || 'localhost',
  BROWSERSYNC_PORT: process.env.BROWSERSYNC_PORT || 3000,
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING || false,
};

const clientRoot = path.resolve(rootForProject, 'src/client');
const serverRoot = path.resolve(rootForProject, 'src/server');
const buildFolder = path.resolve(rootForProject, 'build');

const clientAppEntryPoint = fileExists(path.resolve(clientRoot, 'app.js')) ?
  path.resolve(clientRoot, 'app.js') : path.resolve(clientRoot, 'app.jsx');
const defaultPublicPath = '/';
const publicPath = process.env.PUBLIC_PATH || defaultPublicPath;

export const PATHS = {
  publicFilesFolder: path.resolve(serverRoot, 'public-files'),
  templateLocation: path.resolve(serverRoot, 'views/layout.hbs'),
  staticRender: path.resolve(serverRoot, 'staticRender'),

  manifestRootAssetPath: './src/client',
  manifest: path.resolve(buildFolder, 'manifest.json'),
  eslintProjectConfig,
  scssIncludePaths: [clientRoot],

  clientRoot,
  serverRoot,
  clientAppEntryPoint,
  buildFolder,
  publicPath: (currentScript === 'watch') ? defaultPublicPath : publicPath,
};
debug('PATHS: ', PATHS);

const watchNamingConvention = '[name]';
export const buildNamingConvention = '[name].[chunkhash]';
export const namingConvention =
  (currentScript === 'watch') ? watchNamingConvention : buildNamingConvention;
export const cssChunkNaming = '[name]__[local]___[hash:base64:5]';
