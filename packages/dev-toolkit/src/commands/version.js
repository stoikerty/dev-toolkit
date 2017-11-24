import chalk from 'chalk';

import pkg from '../../package.json';
import { log } from '../utilities';

// Outputs current version number from `package.json`
log({ message: `You are running ${chalk.green(`${pkg.name} v${pkg.version}`)}\n` });
