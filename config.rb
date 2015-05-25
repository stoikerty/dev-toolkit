# use live-reload library
activate :livereload, :grace_period => 0.5, :host => 'localhost', :port => '44556'
# activate :livereload, :apply_js_live => true, :grace_period => 0.5

# use custom compass config for output css
compass_config do |config|
  config.output_style = :expanded
end

# ignore the dependency-related error "Option :layout is not supported by Slim::Engine"
require 'slim'
Slim::Engine.disable_option_validator!

page "/index.html"

# ---

# separate page example. included file should be: /source/simple_page.erb
# page "/simple_page.html", :layout => false

###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end