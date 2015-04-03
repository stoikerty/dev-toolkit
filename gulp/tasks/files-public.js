var gulp      = require('gulp');
var config    = require('../config');

gulp.task('files-public', function() {
  return gulp.src(config.filesPublic.src)
    .pipe(gulp.dest(config.filesPublic.dest));
});
