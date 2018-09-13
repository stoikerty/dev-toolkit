const path = require('path');

// Example of programmatic usage of dev-toolkit with a serverless-type application
require('dev-toolkit').default({
  command: 'preRender',
  options: {
    preRenderEntryPoint: path.resolve(process.cwd(), 'src/server/preRender'),
    silent: true,
  },
});
