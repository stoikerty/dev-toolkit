var gulp  = require('gulp');
var gutil = require('gulp-util');

var start = new Date().getTime();

gulp.task('build', function(cb){
  gutil.log('-----------------------------');
  gutil.log(gutil.colors.yellow('   Starting Asset Builder'));
  gutil.log('-----------------------------');

  gutil.log(gutil.colors.yellow('-    Compile Javascript     -'));
  gulp.start('run-build-step-1');
  return cb;
});
gulp.task('run-build-step-1', ['javascript'], function(cb){
  gutil.log(gutil.colors.yellow('-      Compile CSS          -'));
  gulp.start('run-build-step-2');
  return cb;
});
gulp.task('run-build-step-2', ['css'], function(cb){
  gutil.log(gutil.colors.yellow('-       Copy Files          -'));
  gulp.start('run-build-step-3');
  return cb;
});
gulp.task('run-build-step-3', ['images', 'fonts', 'files', 'public-root'], function(cb){
  var end = new Date().getTime();
  var time = end - start;

  gutil.log('-----------------------------');
  gutil.log(
    gutil.colors.yellow(' Assets processed in'),
    gutil.colors.magenta((time / 1000).toFixed(1) + ' s')
  );
  gutil.log('-----------------------------');
  return cb;
});
