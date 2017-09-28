import extractedSharedEnvs from './extractedSharedEnvs';

export default (settings = {}) => {
  const webpack = settings.webpack || {};
  const devToolkit = settings.devToolkit || {};

  const sharedEnvs = {
    // extract only explicitly declared environment variables from `process.env`
    ...extractedSharedEnvs({
      withEnvs: devToolkit.sharedEnvs && Array.isArray(devToolkit.sharedEnvs)
        ? devToolkit.sharedEnvs : [],
      fromEnvs: process.env,
    }),
    // make NODE_ENV always available
    NODE_ENV: process.env.NODE_ENV,
  };

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
      usePreRender: (typeof devToolkit.usePreRender === 'boolean')
        ? devToolkit.usePreRender : true,
      sharedEnvs,
    },
  };
};
