/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var gutil  = require('gulp-util');
var watch  = require('gulp-watch');
var config = require('../config');

gulp.task('watch', function(cb){
  gutil.log('-----------------------------');
  gutil.log(gutil.colors.green('   Starting Asset Watcher'));
  gutil.log('-----------------------------');

  gulp.start('run-watch');
  return cb;
});

gulp.task('run-watch', ['javascript-watch', 'browserSync', 'sass', 'images', 'files-public'], function(callback) {
  watch(config.sass.src, function() { gulp.start(['sass']); });
  watch(config.images.src, function() { gulp.start(['images']); });
  watch(config.filesPublic.src, function() { gulp.start(['files-public']); });
  watch(config.fonts.src, function() { gulp.start(['fonts']); });
});
