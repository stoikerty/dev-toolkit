// Gulp + Browserify recipe
// ------------------------
// Includes react JSX, coffeescript, uglify & sourcemaps
// Supports multiple input & output files

var gulp       = require('gulp');
var gutil      = require('gulp-util');
var browserifyInc = require('browserify-incremental');
var babelify   = require('babelify');
var babel      = require('gulp-babel');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var parsePath  = require('parse-filepath');
var browserSync  = require('browser-sync');

var config       = require('../config');

// compile all javascript files
gulp.task('javascript', ['browserify']);
gulp.task('javascript-watch', ['browserify-watch']);

// compile .js files after passing them through eslint
gulp.task('browserify', ['eslint'], function () {
  var files = config.javascript.rootFiles;
  var transforms = config.javascript.transforms || {};

  return runBrowserify(files, transforms, { watch : false });
});

// compile .js, run through eslint once, watch for changes
gulp.task('browserify-watch', function () {
  var files = config.javascript.rootFiles;
  var transforms = config.javascript.transforms || {};

  return runBrowserify(files, transforms,{
    watch : true,
    devMode : true,
  });
});

function runBrowserify(files, transforms, options){
  var firstBundle;

  files.forEach(function (file) {
    var devMode = false;
    if (options && options.devMode) { devMode = true; }

    var bundler = browserifyInc({
      entries: file.src, // Only need initial file, browserify finds the deps
      debug: devMode,    // Enable sourcemaps

      cache: {}, packageCache: {}, fullPaths: true,
      cacheFile: './node_modules/browserify-cache.json'
    });

    // Convert ES6 syntax & JSX
    if (transforms.babelify)
      bundler.transform(
        babelify.configure({
          presets: ['es2015', 'react'],
          plugins: ['jsx-control-statements/babel'],
        })
      );

    // save the bundle creation process as a function
    var createBundle = function (bundler){
      if (devMode)
        return bundler.bundle()
          .on('error', function(errorObject) {
            console.log(errorObject.toString());
            // Keep gulp watcher from hanging on this task
            if (options.watch) this.emit('end');
            else process.exit(1);
          })
          .pipe(source(file.destName))
          .pipe(buffer())
          .pipe(gulp.dest(file.destDir))
          .pipe(browserSync.reload({stream:true}));
      else
        // Optional future improvement to reduce minified size.
        // Removes log and warn messages from output:
        //   uglify({
        //     compress: {
        //       pure_funcs: [ 'app.warn', 'console.warn', 'app.log', 'console.log' ]
        //     }
        //   })
        return bundler.bundle()
          .on('error', function(errorObject) {
            console.log(errorObject.toString());
            // Keep gulp watcher from hanging on this task
            if (options.watch) this.emit('end');
            else process.exit(1);
          })
          .pipe(source(file.destName))
          .pipe(buffer())
          .pipe(uglify({ compress: false }))
          .pipe(gulp.dest(file.destDir));
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
