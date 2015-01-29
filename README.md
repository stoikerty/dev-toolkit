How to use this folder
======================

Warning:
You will need to understand how to integrate compiled templates using javascript, either with [Ampersand.js](https://ampersandjs.com/) or by using another way. This toolbox does not have pure html-files of any kind, everything is compiled from .jade templates. [The built output is minimalistic and consists of only 3 files, an html-file a js-file and a css-file](http://read.humanjavascript.com/ch02-the-big-decision.html).

You need to have previous experience in using npm and common-js modules. It is also beneficial if you know about sass/scss for creating your css.

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
> compass compile
> npm run build

You should now have a folder called "_build" with all the necessary files to upload to your server.

Using the project folder as a development server
------------------------------------------------
> compass watch
> npm run server

You now have a livereload server running that refreshes on CSS changes.

Make sure to restart the server when you add a new npm-module.