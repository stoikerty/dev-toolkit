module.exports = {
  devToolkit: {
    usePreRender: true,
    sharedEnvs: ['MY_CUSTOM_ENV'],
  },

  // Use custom webpack configuration here. Available `options` for each function:
  // { projectRoot, creatingBuild, namingConvention, assetsPath, publicPath, babelrc }
  webpack: {
    // Extend existing webpack rules (formerly called loaders)
    rules: function rules(options) {
      return [];
    },
    // Extend existing webpack plugins
    plugins: function plugins(options) {
      return [];
    },
  },
};
