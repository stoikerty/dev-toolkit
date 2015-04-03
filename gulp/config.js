var readAssetsPath = require("./utils/generateAssetsPath");

var src  = './gulp/assets';
var assetsPath = readAssetsPath();
var assetsHost = '';
var publicDir = './public';
var dest = publicDir + assetsPath;

module.exports = {

  // Live-Reloading
  // ===============

  // BrowserSync options can be found here:
  // http://www.browsersync.io/docs/options/
  browserSync: {
    proxy: 'localhost:3000',

    // Stop the browser from automatically opening
    open: false,
    // Scrolls & Form inputs on any device will be mirrored to all others.
    ghostMode: {
      clicks: false,
      scroll: true,
      forms: true
    },
    // show what browsers are connected
    logConnections: true
  },

  // JS Configuration
  // ==================
  // - Multiple input files can be specified
  // - jshint is only used for .js files

  javascript: {
    src: src + '/javascript/**/*.js',
    dest: dest + '/js',

    transforms: {
      reactify: true,
    },
    rootFiles: [
      {
        src: src + '/javascript/app.js',
        dest: 'app.js'
      }
    ]
  },

  jshint: {
    src: src + '/javascript/**/*.js'
  },

  // CSS Configuration
  // ==================
  // CSS is compiled via 'libsass'
  // Settings Options: https://github.com/sass/node-sass#options

  sass: {
    src: src + '/stylesheets/**/*.{sass,scss}',
    dest: dest + '/css',

    settings: {
      indentedSyntax: false,   // Enable .scss syntax!
      imagePath: assetsPath,   // Used by the image-url helper
      outputStyle: 'compact',
      sourceComments: false
    },

    production:{
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

  filesPublic: {
    src: src + '/files-public/**/*',
    dest: publicDir
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts'
  },

  images: {
    src: src + '/images/**/*',
    dest: dest
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
