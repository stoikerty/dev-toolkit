#!/usr/bin/env node
import babelRunner from 'babel-runner';
import path from 'path';

babelRunner({
  babelrc: path.resolve(__dirname, '../babelrc.js'),
  fileToRun: path.resolve(__dirname, `../commands/${process.env.TOOLKIT_COMMAND}`),
});
