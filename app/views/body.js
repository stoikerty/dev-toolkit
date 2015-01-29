var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template : templates.body,
    autoRender : true,
    initialize : function(){
        document.title = '{ Project }';
    },
    render : function(options){
        var self = this;
        this.renderWithTemplate();
        
        console.log('document body rendered');
    }
});