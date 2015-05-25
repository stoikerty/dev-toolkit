document.addEventListener("DOMContentLoaded", function(event) {
    (function (document){
        // ----
        // Utility Functions
        // ----

        function translate(element, x, y) {
            element.style["-webkit-transform"] = "translate(" + x + "px, " + y + "px)";
            element.style["-moz-transform"]    = "translate(" + x + "px, " + y + "px)";
            element.style["-ms-transform"]     = "translate(" + x + "px, " + y + "px)";
            element.style["-o-transform"]      = "translate(" + x + "px, " + y + "px)";
            element.style["transform"]         = "translate(" + x + "px, " + y + "px)";
        }
        
        function isNumber(obj) {
            return toString.call(obj) === '[object Number]';
        };

        // ----
        // Important Variables
        // ----

        // save elements for later use
        var exampleEl = document.querySelector('.content');

        // ----
        // Logic
        // ----

        function ExampleClass(options, parameters){
            this._var = null;

            this._init = function(){
            };

            /**
             * Private Methods
             */

            this._privateMethod = function(){
            };

            /**
             * Public Methods
             */

            this._publicMethod = function(){
            };

            return this._init();
        }

        var exampleClass = ExampleClass();

    })(document);
});
