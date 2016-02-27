var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('browserSync', function() {
  browserSync(config.browserSync);
});
