var gulp      = require('gulp');
var config    = require('../config');

gulp.task('public-root', function() {
  return gulp.src(config.publicRoot.src)
    .pipe(gulp.dest(config.publicRoot.dest));
});
