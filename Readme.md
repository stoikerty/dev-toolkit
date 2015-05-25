How to use this folder
======================

The source code is built using ["middleman"](http://middlemanapp.com/)
Assuming you have ruby and rubygems installed, to install and use middleman you can type in the following line in the terminal:
> gem install middleman

Then, inside this folder run `bundle install` to get and install the necessary gems used in the project.


Building the final project files
--------------------------------
> bundle exec middleman build

All your files will be compiled into the `build` folder.


Using the project folder as a development server
------------------------------------------------
> bundle exec middleman server

if encountering problems you can also use:
> middleman server -p 4567 -e development

shorter syntax version should work as well:
> middleman server

Now you can modify the files in the `source` directory, they will be automatically compiled and your page should be refreshed for you to see the results.

**~ happy coding ~**