#!/usr/bin/env node
import path from 'path';

import babelRunner from '../index';

// Run specified file from second argument when first argument `--run` is given
const options = process.argv.slice(2);
const runCommandGiven = (options[0] === '--run' || options[0] === '-r');
const fileToRun = runCommandGiven && path.resolve(process.cwd(), options[1]);

babelRunner({ fileToRun });
