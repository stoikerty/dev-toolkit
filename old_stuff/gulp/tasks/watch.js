/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var gutil  = require('gulp-util');
var watch  = require('gulp-watch');
var gaze   = require('gaze');
var config = require('../config');

gulp.task('watch', function(cb){
  gutil.log('-----------------------------');
  gutil.log(gutil.colors.green('   Starting Asset Watcher'));
  gutil.log('-----------------------------');

  gulp.start('run-watch');
  return cb;
});

var watchFiles = function(files, task){
  gaze(files, function() {
    this.on('changed', function(filepath) {
      gulp.start([task]);
    });
  });
}

gulp.task('run-watch', ['javascript-watch', 'browserSync', 'sass', 'images', 'fonts', 'files', 'public-root'], function(callback) {
  watchFiles(config.sass.src, 'sass');
  watchFiles(config.images.src, 'images');
  watchFiles(config.fonts.src, 'fonts');
  watchFiles(config.files.src, 'files');
  watchFiles(config.publicRoot.src, 'public-root');
});
