var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var livereload = require('livereload');
var hapiServer = hapi.createServer(3000, 'localhost');
var templatizer = require('templatizer');

hapiServer.pack.register([
    {
        plugin : moonboots,
        options : {
            // take any entry point
            appPath : '/{p*}',

            // Directory to build files into
            directory: __dirname + '/_build',

            // Contents from the public directory
            // will be copied to the target directory 
            //public : __dirname + '/public',

            moonboots : {
                // __dirname means current directory [node]
                main : __dirname + '/app/app.js',
                developmentMode : true,
                minify : false,
                stylesheets : [
                    __dirname + '/public/css/style.css'
                ],
                beforeBuildJS: function () {
                    // This re-builds our template files from jade each time the app's main
                    // js file is requested. Which means you can seamlessly change jade and
                    // refresh in your browser to get new templates.
                    
                    // enable sourcemaps
                    this.browserify.debug = true;
                    this.browserify.global = false;

                    // compile all templates files so they are ready-to-use
                    templatizer(__dirname + '/app/templates', __dirname + '/app/templates.js');
                },
                // `done` means use this function asynchronously
                beforeBuildCSS : function(done){
                    done();
                }
            }
        }
    }
], function(){
    // start server after registering the plugin
    hapiServer.start();

    var liveServer = livereload.createServer({
        applyJSLive: false,
        applyCSSLive : true,
        interval : 200
    });
    // refresh css on change
    liveServer.watch(__dirname + "/public/css");

    console.log('Project Server running on localhost:3000');
});