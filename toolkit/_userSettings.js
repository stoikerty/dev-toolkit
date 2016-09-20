import fs from 'fs';
import path from 'path';
import fileExists from 'file-exists';

import debug from './utils/debug';

const requireOrNull = (requirePath) => (
  // eslint-disable-next-line global-require
  fileExists(requirePath) ? require(requirePath) : null
);

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

const pkg = requireOrNull(path.resolve(rootForRequire, 'package.json')) || {};
export const vendor = pkg.toolkitSettings && pkg.toolkitSettings.vendor ?
  pkg.toolkitSettings.vendor : [];
debug('vendor', vendor);

// NOTE: There's limited support for using these custom config escape hatches. You're on your own!
export const overrideConfig = requireOrNull(
  path.resolve(
    rootForRequire,
    pkg.toolkitSettings.webpackConfigPath ?
      pkg.toolkitSettings.webpackConfigPath : 'customWebpackConfig.js'
  )) || {};
debug('overrideConfig', overrideConfig);

// eslint-disable-next-line global-require
const toolkitBabelConfig = requireOrNull(path.resolve(__dirname, '../babelrc.js')) || {};
debug('toolkitBabelConfig', toolkitBabelConfig);

// NOTE: There's limited support for using these custom config escape hatches. You're on your own!
const overrideBabelConfig = requireOrNull(
  path.resolve(
    rootForRequire,
    pkg.toolkitSettings.babelConfigPath ? pkg.toolkitSettings.babelConfigPath : 'customBabelrc.js'
  )) || {};
debug('overrideBabelConfig', overrideBabelConfig);
if (overrideBabelConfig.presets) {
  toolkitBabelConfig.presets = toolkitBabelConfig.presets.concat(overrideBabelConfig.presets);
  delete overrideBabelConfig.presets;
}
if (overrideBabelConfig.plugins) {
  toolkitBabelConfig.plugins = toolkitBabelConfig.plugins.concat(overrideBabelConfig.plugins);
  delete overrideBabelConfig.plugins;
}

export const babelConfig = { ...toolkitBabelConfig, ...overrideBabelConfig };
debug('babelConfig', babelConfig);

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
  dynamicRenderFile: path.resolve(serverRoot, 'dynamicRender.js'),

  manifestRootAssetPath: './src/client',
  manifestFile: path.resolve(buildFolder, 'manifest.json'),
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
