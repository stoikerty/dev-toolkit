var domready = require('domready');
var BodyView = require('./views/body');

window.app = {
    init : function(){
        domready(function(){
            console.log('starting app');

            // create the main view
            self.view = new BodyView({
                el : document.body
            });
        });
    }
};

window.app.init();