export default (settings = {}) => {
  const webpack = settings.webpack || {};
  const devToolkit = settings.devToolkit || {};
  return {
    webpack: {
      loaders: webpack.loaders && Array.isArray(webpack.loaders)
        ? webpack.loaders : [],
      plugins: webpack.lugins && Array.isArray(webpack.lugins)
        ? webpack.lugins : [],
      customize: webpack.customize && (typeof webpack.customize === 'function')
        ? webpack.customize : (config) => config,
    },
    devToolkit: {
      preRender: (typeof devToolkit.preRender === 'boolean')
        ? devToolkit.preRender : true,
    },
  };
};
