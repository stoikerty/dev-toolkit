[ Draft Document to replace current Readme.md]

# dev-toolkit

Develop your <code>react</code>-powered Web App with minimum distractions.

![](gif)

* [Getting Started](#getting-started) ⏤ Installation, folder structure.
* [Using images & files](#using-images--files) ⏤ Import anything or use static files.
* [Making the most of CSS](making-the-most-of-css) ⏤ CSS-modules, Autoprefixer...
* [Linting your files](#linting-your-files) ⏤ With hot-reload & a useful overlay.
* [Build & deploy](#build--deploy) ⏤ Move your app into production.
* [Using a test-framework](#using-a-test-framework) ⏤ Use the default... or not.
* [Extending your app](#extending-your-app) ⏤ You can, but be aware of the risks.

<!-- -->


* [Contributing](#contributing)
* [List of available commands](#list-of-available-commands)
* [Specifications](#specifications) ⏤ Main features, Default packages & compatibility.
* [Changelog](#changelog)

## Getting Started
### Installation
### Initial project structure

## Using images & files
### Importing in javascript
### Using the `public-files` folder

## Linting your files
### Workflow with watch-command
### Editor configuration

## Build & deploy
### Generating a `build` folder with all files
#### A simple build
#### Dynamic Pages backed by server-rendering
### Using a javascript server

## Extending your app
### The toolkit config
### Environment Variables
### Extending Webpack & Babel
#### The Risks
#### Custom Webpack Config
#### Custom Babel Config

## Using a test-framework
### Adding tests to your app
### Replacing the default test-suite

## Contributing
### Acknowledgements
### Alternatives

## List of available commands

## Specifications
### Main features
### Default packages after `dev-toolkit --init`
### Compatiblity

## Changelog

---

# Notes / TODO

Goals & Purpose:
- fast to setup
- run multiple apps using the same underlying principles
- as little configuration as necessary
- powerful enough to run production-scale apps
- defer testing and additional setup to app

Very suitable for;
- Intermediary to advanced users
- Creating a single-page-app from scratch
- Migrating an old server to javascript-backed splash-page(s)

Not quite suitable for:
- Learning React as a Beginner
- Creating small snippets of code to use in existing app

TODO:
- add script for build
- add script for watch
- add script for publish?
- move readme for toolkit to root, check urls
- change homepage urls in package.json
- publish both packages

Additional TODO for better docs with animated clips:
- gif for starting a project
- gif for when one creates a syntax/eslint error
- gif for testing with watch command
- gif for generating dynamic pages

Necessities:
- install all dependencies for all packages at once
- build & watch all packages at once
- build each package individually on `npm publish` of a package
