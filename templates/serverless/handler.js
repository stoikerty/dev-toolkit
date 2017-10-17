const path = require('path');

// Example of programmatic usage of dev-toolkit with a serverless-type application
require('dev-toolkit').default({
  command: 'preRender',
  options: {
    entryPoint: path.resolve(process.cwd(), 'src/server/preRender'),
  },
});
