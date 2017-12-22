module.exports = {
  devToolkit: {
    usePreRender: true,
    sharedEnvs: ['MY_CUSTOM_ENV'],
  },

  // Use custom webpack configuration here
  webpack: {
    loaders: function(options) {
      return [];
    },
    plugins: function(options) {
      return [];
    },
  },
};
