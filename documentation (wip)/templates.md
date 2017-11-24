# dev-toolkit Templates
A collection of templates of how dev-toolkit can be used.
Each one of these templates can be initialized from the command-line with:
```bash
dev-toolkit init my_project --template [template-name]
```

## Shared Structure
...
- server / client split

## Available Templates

### minimal (default)
Stripped out example with pre-render

### standard (suggested)
If you want to start a project from scratch, this is your best starting point.
This template contains no routing, it will give you out of the box:
- simple client app with
  - hot-reload for development
  - 1 view called `App.js`
- simple server app for
  - rendering the layout on request
  - pre-rendering the layout to an html file
- `settings.js`-file to be shared between client & server with
  - example usage of `sharedEnvs` via `dev-toolit/settings`
- `dev-toolkit.config.js`-file which contains
  - usePreRender set to `false` (default)
  - example usage with `MY_CUSTOM_ENV` environment variable
- `handler.js`-file serverless-type mini-example which contains
  - example usage of `dev-toolkit` programmatic API usage

---

## WIP Templates

### with-sass
Example using sass/scss with custom webpack configuration and node-hooks

### serverless
Example using dev-toolkit programmatically for usage with cloud-functions/lambdas in a serverless scenario.

---

## Planned Templates

### with-react-router
### with-redux
### with-mocha
### with-jest
### with-glamorous
### with-dynamic-routes
### with-styled-components

### as exported npm-package?
