var Moonboots = require('moonboots-static');
var templatizer = require('templatizer');

var moonboots = new Moonboots({
    moonboots: {
        // __dirname means current directory [node]
        main : __dirname + '/app/app.js',
        developmentMode : false,
        minify : true,
        resourcePrefix : '',
        stylesheets : [
            __dirname + '/public/css/style.css'
        ],
        beforeBuildJS: function () {
            // compile all templates files so they are ready-to-use
            templatizer(__dirname + '/app/templates', __dirname + '/app/templates.js');
        },
        // `done` means use this function asynchronously
        beforeBuildCSS : function(done){
            done();
        }
    },
    // Contents from the public directory
    // will be copied to the target directory 
    public: __dirname + '/public',
    // Directory to build files into
    directory: __dirname + '/_build',
    // Log build items
    verbose: true
});

moonboots.on('ready', function (err) {
    if (err) {
        // Oh no something went wrong
        console.log('error');
    } else {
        // Yay, we built our files!
        console.log('build success');
    }
});