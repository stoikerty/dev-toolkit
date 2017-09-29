#!/usr/bin/env node
import babelRunner from 'babel-runner';
import path from 'path';

babelRunner({
  fileToRun: path.resolve(__dirname, `../commands/${process.env.DEV_TOOLKIT_COMMAND}`),
});
