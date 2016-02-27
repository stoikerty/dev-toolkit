var generateAssetsPath = require("./utils/generateAssetsPath");

var src  = './gulp/assets';
var assetsPath = generateAssetsPath({ name: 'assets'});
var assetsHost = '';
var proxyURL = 'localhost:2000';
var rootDir = '.';
var publicDir = 'public/';
var dest = publicDir + assetsPath;

module.exports = {

  // Live-Reloading
  // ===============

  // BrowserSync options can be found here:
  // http://www.browsersync.io/docs/options/
  browserSync: {
    proxy: proxyURL,

    reloadDelay: 100,

    // Stop the browser from automatically opening
    open: false,
    // Scrolls & Form inputs on any device will be mirrored to all others.
    ghostMode: {
      clicks: false,
      scroll: true,
      forms: true,
    },
    // show what browsers are connected
    logConnections: true,
  },

  // JS Configuration
  // ==================
  // - Multiple input files can be specified
  // - jshint is only used for .js files

  javascript: {
    src: src + '/javascript/**/*.js',
    serverSrc: src + '/javascript/**/*.js',
    dest: dest + '/js',

    transforms: {
      babelify: true,
    },
    rootFiles: [
      {
        src: src + '/javascript/app.js',
        destName: 'app.js',
        destDir: dest + '/js',
      },
    ],
  },

  eslint: {
    src: src + '/javascript/**/*.js',
  },

  // CSS Configuration
  // ==================
  // CSS is compiled via 'libsass'
  // Settings Options: https://github.com/sass/node-sass#options

  sass: {
    src: src + '/stylesheets/**/*.{sass,scss}',
    watchSrc: src + '/stylesheets/**/*.{sass,scss}',
    dest: dest + '/css',

    settings: {
      indentedSyntax: false,   // Enable .scss syntax!
      imagePath: assetsPath,   // Used by the image-url helper
      outputStyle: 'compact',
      sourceComments: false
    },

    production:{
      src: src + '/stylesheets/**/*.{sass,scss}',
      settings: {
        indentedSyntax: false,  // Enable .scss syntax!
        imagePath: assetsHost + assetsPath,   // Used by the image-url helper
        outputStyle: 'compact',
        sourceComments: false
      },
    }
  },

  // Supported Browsers via `Autoprefixer`
  // see: https://github.com/ai/browserslist
  autoprefixer: {
    browsers: [
      '> 0.8%',
      'last 2 versions',
      'Explorer >= 9'
    ]
  },

  // Static Assets
  // ==============

  files: {
    src: src + '/files/**/*',
    dest: publicDir
  },

  publicRoot: {
    src: src + '/public-root/**/*',
    dest: publicDir
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts'
  },

  images: {
    src: src + '/images/**/*',
    dest: dest + '/images',
  },

  // Production Settings
  // ====================

  production: {
    src: {
      all: dest + '/*',
      css: dest + '/*.css',
      js: dest + '/*.js',
    },
    dest: dest
  }
};
