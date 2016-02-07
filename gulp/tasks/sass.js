var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var cssBase64    = require('gulp-css-base64');
var gulpReplace  = require('gulp-replace');

var handleErrors = require('../utils/handleErrors');
var config       = require('../config');

gulp.task('sass', function () {
  return gulp.src(config.sass.src)
    // .pipe(sourcemaps.init())
      .pipe(sass(config.sass.settings))
      .on('error', handleErrors)
    // .pipe(sourcemaps.write())

    // .pipe(gulpReplace(config.sass.imagePathReplaceString, config.sass.production.settings.imagePath))
    // .pipe(cssBase64({ baseDir: config.sass.imageSrc }))
    .pipe(autoprefixer(config.autoprefixer.browsers))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass-production', function () {
  return gulp.src(config.sass.production.src)
    .pipe(sass(config.sass.production.settings))
    .on('error', handleErrors)

    // .pipe(gulpReplace(config.sass.imagePathReplaceString, config.sass.production.settings.imagePath))
    // .pipe(cssBase64({ baseDir: config.sass.imageSrc }))
    .pipe(autoprefixer(config.autoprefixer.browsers))
    .pipe(gulp.dest(config.sass.dest));
});
