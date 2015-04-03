var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');

var handleErrors = require('../utils/handleErrors');
var config       = require('../config');

gulp.task('sass', function () {  
  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
      .pipe(sass(config.sass.settings))
      .on('error', handleErrors)
    .pipe(sourcemaps.write())
    
    .pipe(autoprefixer(config.autoprefixer.browsers))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass-production', function () {
  return gulp.src(config.sass.src)
    .pipe(sass(config.sass.production.settings))
    .on('error', handleErrors)
    
    .pipe(autoprefixer(config.autoprefixer.browsers))
    .pipe(gulp.dest(config.sass.dest));
});
