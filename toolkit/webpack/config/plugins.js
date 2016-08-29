import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ManifestRevisionPlugin from 'manifest-revision-webpack-plugin';

import {
  PATHS,
  env,
  isDev,
  namingConvention,
  buildNamingConvention,
} from '../../_userSettings';

const sharedPlugins = [
  new ProgressBarPlugin({ width: 40 }),
  new webpack.optimize.CommonsChunkPlugin('vendor', `${namingConvention}.js`),
  new CopyWebpackPlugin([{ from: PATHS.publicFilesFolder }]),
  new webpack.DefinePlugin({
    // For redux and react only
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // All other environment variables are passed through via `buildSettings`
    buildSettings: {
      env: JSON.stringify(process.env),
    },
  }),
];

const developmentPlugins = [
  // Use hot-reload middleware, browsersync for development
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),

  new BrowserSyncPlugin(
    {
      // BrowserSync options - see: http://www.browsersync.io/docs/options/

      // Use http://localhost:3000/ for development, proxy Dev Server.
      host: env.PROXY_HOST, port: env.PROXY_PORT,
      proxy: `http://${env.HOST}:${env.PORT}/`,
      // Stop the browser from automatically opening.
      open: false,
      // Scrolls & Form inputs on any device will be mirrored to all others.
      ghostMode: {
        clicks: false,
        scroll: true,
        forms: true,
      },
      // Show what browsers are connected.
      logConnections: true,
    },
    {
      // Webpack Plugin options

      // Prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this.
      reload: false,
    }
  ),
];
console.log(PATHS.templateLocation);
const productionPlugins = [
  // Extract css into one file for production, minify javascript
  new ExtractTextPlugin(`${buildNamingConvention}.css`, { allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  new HtmlWebpackPlugin({
    inject: false,
    template: PATHS.templateLocation,

    reactHtml: '',
    isDev,
    creatingBuild: true,
    env: JSON.stringify(process.env),
  }),
  new ScriptExtHtmlWebpackPlugin({
    async: ['app'],
    defer: ['app'],
    defaultAttribute: 'sync',
  }),
  new ManifestRevisionPlugin(
    PATHS.manifest,
    {
      rootAssetPath: PATHS.manifestRootAssetPath,
      ignorePaths: [],
      extensionsRegex: /\.(jpe?g|png|gif|svg)$/i,
    }
  ),
];

// TODO: extract out
if (process.env.COMPRESS) {
  productionPlugins.push(
    new CompressionPlugin({
      asset: '[path]',
      test: new RegExp(process.env.GZIP_UPLOAD_PATTERN),
      minRatio: 0,
    })
  );
}

export default isDev ?
  sharedPlugins.concat(developmentPlugins)
  : sharedPlugins.concat(productionPlugins);
