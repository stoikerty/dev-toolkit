module.exports = {
  devToolkit: {
    usePreRender: true,
    sharedEnvs: ['MY_CUSTOM_ENV'],
  },
  webpack: {
    loaders: () => [
      {
        test: /\.scss$/,
        loaders: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
};
