#!/usr/bin/env node
// import jsxHook from 'node-jsx-babel';

import path from 'path';
import babelConfig from '../babelrc';

// Set up server-side rendering for jsx-files
// NOTE:
//   This statement is here due to a race-condition. It needs to be called
//   before `babel-register`, otherwise it would be in `...config/loaders.js`
// jsxHook.install();

// register any future files to run with specified babel-config
import('babel-core/register').then((module) => {
  module(babelConfig);
  import(path.resolve(__dirname, `../commands/${process.env.TOOLKIT_COMMAND}`));
});
