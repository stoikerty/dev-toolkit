// Example of programmatic usage of dev-toolkit.
// This is useful for things like serverless applications.

require('dev-toolkit').default({
  command: 'preRender',
  // Environment variables (which might not be available depending on your setup) can be passed
  // separately as an `envs`-object, they will be transformed into environment variables on the fly.
  envs: {
    NODE_ENV: 'production',
    MY_CUSTOM_ENV: 'foo-from-handler',
  },
});
