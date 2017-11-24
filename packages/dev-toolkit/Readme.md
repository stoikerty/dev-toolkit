<h1 align="center">dev-toolkit</h1>
<p align="center">
Jump-start your <code>react</code>-powered Universal App<br />
<em>Designed for Veterans</em>
</p>
<br />

`dev-toolkit` provides you with an easy and quick way to get started with a pre-rendered &
server-rendered app. After creating your starting point with the `init` command, you get full
customizeability out of the box.

### Quick Start

```bash
$ npm install -g dev-toolkit
```

```bash
# Initialize a project with optional name, template, comments
# The comments explain how the `dev-toolkit` works with the template
$ dev-toolkit init [project_name] [--template template_name] [--skip-comments]
```

#### List of available templates

* `standard` (default)
* `with-eslint`
* `with-sass`

## Features

* hot-reload on client by default
* server-rendering
* pre-rendering
* creating a build
* custom webpack config
* use environment variables on client

### No CSS by default

With CSS-in-JS solutions on the rise, it would be unwise to include dependencies for css-modules,
sass or less in every project that has `dev-toolkit` as a dependency which would introduce
additional installation time and bloat. The aim of dev-toolkit is to be unopinionated so that it can
be useful in many scenarios.

## Contributing

Check out the project locally & create a PR.

```bash
# Clone down the repo locally
$ git clone git@github.com:stoikerty/dev-toolkit.git

# Install root lerna dependencies
$ cd dev-toolkit
$ npm install

# Bootstrap all packages
$ npm run bootstrap
# If you encounter linux/osx permission issues, try this
$ npm run bootstrap-fix

# Run feature tests
$ cd feature-tests
$ npm install
$ npm run test
```

Your workflow will likely be to `cd` into a template of your choice in the `templates` directory
where you can test `dev-toolkit` and in parallel (in a separate terminal) re-run the
`bootstrap`-command in the root of the project after making changes in one of the `packages`.

### Roadmap

* Improved docs
* Using your own (external) template - under consideration
* Eject feature - under consideration
* serverless template - in development
* list differences between dev-toolkit, next.js & create-react-app
