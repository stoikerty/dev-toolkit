var gulp   = require('gulp');
var react  = require('gulp-react');
var jshint = require('gulp-jshint');
var config     = require('../config');
// inline dependencies
// * jshint-stylish

gulp.task('jshint', function () {
  return gulp.src(config.jshint.src)
    .pipe(react({ es6module : true }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
