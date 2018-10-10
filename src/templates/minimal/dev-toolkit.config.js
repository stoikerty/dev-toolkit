// This file will be imported by `dev-toolkit` or fall back to defaults if it doesn't exist.
module.exports = {
  // `dev-toolkit` specific settings
  // Defaults: `usePreRender: true, removeBuildFolder: true, sharedEnvs: []`
  devToolkit: {},

  // Use custom webpack configuration here. Available `options` for each function:
  // { projectRoot, creatingBuild, namingConvention, assetsPath, publicPath, babelrc }
  webpack: {
    // Add only webpack rules (formerly called loaders)
    rules: options => [],
    // Add only webpack plugins
    plugins: options => [],

    // Completely customize output config after rules and loaders have been added
    // `webpackConfig` will contain the existing config from ```
    customize: (webpackConfig, options) => ({
      ...webpackConfig,
      // Example for adding externals to webpack config:
      // ...(options.creatingBuild
      //   ? {
      //       externals: {
      //         react: 'React',
      //         'react-dom': 'ReactDOM',
      //         redux: 'Redux',
      //       },
      //     }
      //   : {}),
    }),
  },
};
