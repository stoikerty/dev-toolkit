// Gulp + Browserify recipe
// ------------------------
// Includes react JSX, coffeescript, uglify & sourcemaps
// Supports multiple input & output files

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var parsePath  = require('parse-filepath');
var browserSync  = require('browser-sync');

var handleErrors = require('../utils/handleErrors');
var config       = require('../config');

// compile all javascript files
gulp.task('javascript', ['browserify']);
gulp.task('javascript-watch', ['browserify-watch']);

// compile .js files after passing them through jshint
gulp.task('browserify', ['jshint'], function () {
  var files = config.javascript.rootFiles;
  var transforms = config.javascript.transforms || {};

  return runBrowserify(files, transforms, { watch : false });
});

// compile .js, run through jshint once, watch for changes
gulp.task('browserify-watch', function () {
  var files = config.javascript.rootFiles;
  var transforms = config.javascript.transforms || {};

  return runBrowserify(files, transforms,{
    watch : true,
    devMode : true
  });
});

function runBrowserify(files, transforms, options){
  var firstBundle;

  files.forEach(function (file) {
    var devMode = false;
    if (options && options.devMode) { devMode = true; }

    var bundler = browserify({
      entries: file.src, // Only need initial file, browserify finds the deps
      debug: devMode     // Enable sourcemaps
    });

    if (transforms.reactify) bundler.transform(reactify);   // Convert JSX
    
    // save the bundle creation process as a function
    var createBundle = function (bundler){
      if (devMode)
        return bundler.bundle()
          .on('error', handleErrors)
          .pipe(source(file.dest))
          .pipe(buffer())
          .pipe(gulp.dest(config.javascript.dest))
          .pipe(browserSync.reload({stream:true}));
      else
        return bundler.bundle()
          .on('error', handleErrors)
          .pipe(source(file.dest))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(gulp.dest(config.javascript.dest));
    };

    if (options && options.watch) {
      // wrap the browserify object inside watchify object
      bundler = watchify(bundler);

      // watch for changes
      bundler.on('update', function(ids){
        // create a new bundle each time a file changes

        ids.forEach(function(id){
          // log each file
          gutil.log(
            'File changed:',
            gutil.colors.cyan(parsePath(id).basename)
          );
        });

        createBundle(bundler);
      });

      bundler.on('time', function(time){
        // log out build time
        gutil.log(
          'Bundle created in',
          gutil.colors.magenta((time / 1000).toFixed(1) + ' s')
        );
      });
    }

    // create the bundle when the function first gets run
    firstBundle = createBundle(bundler);
  });

  // return the bundle up the chain to get task first-build time
  return firstBundle;
}
