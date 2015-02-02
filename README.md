stk-toolbox-2
=============

This is the second revision of the toolbox I use personally to create my prototypes or projects. It uses [Moonboots](https://github.com/lukekarrys/moonboots-static) and &yet's [Ampersand.js](https://ampersandjs.com/), as well as [scss & compass](compass-style.org)

---------------------

Technical details: How to use this folder
======================

Warning:
You will need to understand how to integrate compiled templates using javascript, either with [Ampersand.js](https://ampersandjs.com/) or by using another way. This toolbox does not have pure html-files of any kind, everything is compiled from .jade templates. [The built output is minimalistic and consists of only 3 files, an html-file a js-file and a css-file](http://read.humanjavascript.com/ch02-the-big-decision.html).

You need to have previous experience in using [npm](http://npm.org/) and common-js modules. It is also beneficial if you know about sass/scss for creating your css.

Please install [node with npm](http://nodejs.org/) and [ruby & compass](http://compass-style.org/install/).

Make sure to install the correct version of compass:
> gem install compass --version 0.12.6

And install all npm dependencies:
> npm install

**Note:**
**The dev-server and building the project files requires 2 commands at the moment. When I find out how to integrate compass and node-sass into the toolbox, it will be only one command.**
**Until then, this will have to do.**

Building the final project files
--------------------------------
Compile scss stylesheets using compass,
> compass compile

then create a new build. this will create hashed, minified `.js` & `.css` files
> npm run build

You should now have a folder called "_build" with all the necessary files to upload to your server.

Using the project folder as a development server
------------------------------------------------
Run scss compilation continuously in a second terminal,
> compass watch

then start the server at localhost:3000
> npm run server

You now have a livereload server running that refreshes on CSS changes. Don't forget to install the livereload browser plugin.

You have to restart the server when you add a new npm-module.
