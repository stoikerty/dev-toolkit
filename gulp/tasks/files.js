var gulp   = require('gulp');
var config = require('../config');

gulp.task('files', function() {
  return gulp.src(config.files.src)
    .pipe(gulp.dest(config.files.dest));
});
