var gulp      = require('gulp');
var config    = require('../config');
var minifyCSS = require('gulp-minify-css');

gulp.task('css', ['sass-production'], function() {
  return gulp.src(config.production.src.css)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.production.dest));
});
