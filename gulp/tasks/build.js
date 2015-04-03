var gulp  = require('gulp');
var gutil = require('gulp-util'); 

var start = new Date().getTime();

gulp.task('build', function(cb){
  gutil.log('-----------------------------');
  gutil.log(gutil.colors.yellow('   Starting Asset Builder'));
  gutil.log('-----------------------------');

  gulp.start('run-build');
  return cb;
});

// Run this to compress all the things!
gulp.task('run-build', ['javascript', 'css', 'fonts', 'images', 'files-public'], function(cb){
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
