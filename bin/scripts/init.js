#!/usr/bin/env node
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const debug = require('../utils/debug');
const appName = process.argv[2];

if (appName) {
  const startingPoint = path.resolve(__dirname, '../../starting-point');
  const appPath = path.resolve(process.cwd(), appName);

  debug('startingPoint', startingPoint);
  debug('appPath', appPath);

  fse.copy(startingPoint, appPath, function (err) {
    if (err) return console.error(err);

    console.log(chalk.green('->') + ' created files for ' + chalk.magenta(appName));
    console.log(chalk.green('->') + ' installing app dependencies...');

    const isWin = process.platform === 'win32';

    spawn.sync(
      'npm',
      ['install'],
      {
        env: isWin ? {
          PATH: process.env.PATH,
          APPDATA: process.env.APPDATA,
        } : {
          PATH: process.env.PATH,
        },

        // OSX will throw error if shell is not set
        // shell: !isWin,
        stdio: 'inherit',
        cwd: appPath,
      }
    );

    // TODO: #bug #windows
    //   Not sure why an `undefined`-folder gets created after spawn.
    //   Current Solution is to delete it again. (Without `spawn`, no folder is created.)
    const undefinedFolder = path.resolve(appPath, 'undefined');
    fse.removeSync(undefinedFolder);
  });
} else {
  console.log('Please specify a name for your app.');
  console.log('dev-toolkit --init my_app');
}
