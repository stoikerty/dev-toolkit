#!/usr/bin/env node
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const copy = require('ncp');
const debug = require('../utils/debug');
const appName = process.argv[2];

console.log(chalk.blue('~') + ' Javascript Development Toolkit ' + chalk.blue('~'));

if (appName) {
  const startingPoint = path.resolve(__dirname, '../../starting-point');
  const appPath = path.resolve(process.cwd(), appName);

  debug('startingPoint', startingPoint);
  debug('appPath', appPath);

  copy(startingPoint, appPath, function onFinish(err){
     if (err) {
       return console.error(err);
     }

    console.log(chalk.green('->') + ' created files for ' + chalk.magenta(appName));
    console.log(chalk.green('->') + ' installing app dependencies...');

    const isWin = process.platform === 'win32';
    spawn(
      'npm',
      ['install'],
      {
        env: isWin ? {
          APPDATA: process.env.APPDATA,
        } : {},

        // OSX will throw error if shell is not set
        shell: !isWin,
        stdio: 'inherit',
        cwd: appPath,
      }
    );
  });
} else {
  console.log('Please specify a name for your app.');
  console.log('dev-toolkit --init my_app');
}
