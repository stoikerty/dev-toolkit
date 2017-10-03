
require('dev-toolkit').default({
  command: 'preRender',
  envs: {
    NODE_ENV: 'production',
    MY_CUSTOM_ENV: 'foo-from-handler',
  },
});
