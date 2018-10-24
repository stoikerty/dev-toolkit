import path from 'path';
import { pathExistsSync } from 'fs-extra';

// dev-toolkit specific Folders
export const devToolkitRoot = path.resolve(__dirname, '../../');
export const devToolkitDistribution = path.resolve(devToolkitRoot, 'dist');
export const gitRepoRoot = path.resolve(devToolkitRoot, '../../');
export const originalTemplates = path.resolve(gitRepoRoot, 'templates');
export const generatedTemplates = path.resolve(
  devToolkitDistribution,
  'generated-templates/original'
);
export const generatedTemplatesWithoutComments = path.resolve(
  devToolkitDistribution,
  'generated-templates/skipped-comments'
);
export const defaultTemplate = 'standard';

const pathWithDetectedExtension = ({ shortPath, fullPath }) => {
  const extension = path.parse(fullPath).ext;
  const shortPathWithoutExtension = shortPath && shortPath.replace(extension, '');
  const fullPathWithoutExtension = fullPath.replace(extension, '');

  if (pathExistsSync(`${fullPathWithoutExtension}.tsx`)) {
    console.log('-- 1 ->', `${shortPathWithoutExtension || fullPathWithoutExtension}.tsx`);
    return `${shortPathWithoutExtension || fullPathWithoutExtension}.tsx`;
  }
  if (pathExistsSync(`${fullPathWithoutExtension}.ts`)) {
    console.log('-- 2 ->', `${shortPathWithoutExtension || fullPathWithoutExtension}.ts`);
    return `${shortPathWithoutExtension || fullPathWithoutExtension}.ts`;
  }
  if (pathExistsSync(`${fullPathWithoutExtension}.jsx`)) {
    console.log('-- 3 ->', `${shortPathWithoutExtension || fullPathWithoutExtension}.jsx`);
    return `${shortPathWithoutExtension || fullPathWithoutExtension}.jsx`;
  }

  console.log('-- 4 ->', shortPath || fullPath);
  return shortPath || fullPath;
};

// User Project Related Folders & Settings
export const projectRoot = process.cwd();
export const buildFolder = path.resolve(projectRoot, 'build');
export const serverAppEntryPoint = pathWithDetectedExtension({
  fullPath: path.resolve(projectRoot, 'src/server/index.js'),
});
export const userSettingsPath = path.resolve(projectRoot, 'dev-toolkit.config.js');

export const assetsManifestFolder = buildFolder;
export const assetsManifestName = 'assets-manifest.json';
export const assetsManifestFile = path.resolve(assetsManifestFolder, assetsManifestName);

export const entryPoint = pathWithDetectedExtension({
  shortPath: './src/client/index.js',
  fullPath: path.resolve(projectRoot, 'src/client/index.js'),
});

// Make sure leading slash & trailing slash is present (otherwise source-map won't work)
export const publicPath = (process.env.ASSETS_PATH || '/assets')
  .replace(/^\/?/, '/')
  .replace(/\/?$/, '/');
// Remove leading slash from public path to create correct file-path
export const assetsPath = path.resolve(buildFolder, publicPath.replace(/^\//, ''));
