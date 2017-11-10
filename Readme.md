<h1 align="center">dev-toolkit</h1>
<p align="center">
Jump-start your `react`-powered Web App<br />
<sub>Designed for Veterans</sub>
</p>

`dev-toolkit` provides you with an easy and quick way to get started with a server-rendered & pre-rendered app. After creating your starting point with the `init` command, you get full customizeability out of the box.

Make sure to check out [the choices made in this project](#link), the [list of available templates](#link) and the [contributing guide](#link).

## Quick Start - using a template
```bash
$ npm install -g dev-toolkit
```

```bash
# Initialize a project with optional name, template, comments
$ dev-toolkit init [project_name] [--template template_name] [--skip-comments]
```

### List of available templates
- *[standard](#link-1)* (default)
- *[minimal](#link-1)*
- *[with-sass](#link-1)*
- *[serverless](#link-1)*

## Advanced Start - programmatic usage
```bash
$ npm install --save dev-toolkit
```

- Essence
- How to

## Features
- hot-reload on client by default, optional on server
- server-rendering
- pre-rendering
- creating a build
- serverless usage
- custom webpack config
- environment variables usage on client

## How opinionated is dev-toolkit?
A lot of care has been taken to make sure that `dev-toolkit` as well as the starting point you get with the 2 main templates (`standard` and `minimal`) are as unopinionated as possible. This has a number of different implications.

### No CSS by default
With CSS-in-JS solutions on the rise, it would be unwise to include dependencies for css-modules, sass or less in every project that has `dev-toolkit` as a dependency. It would introduce additional installation time and bloat to project that don't make use of it.

There is an alternative to this however. For people who need a css-solution to be integrated with a build-process, there is a number of templates available which show how you can add it on top of dev-toolkit.

### More boilerplate ?


### Fast installation

### Easy usage

### Extendable by default



*Introduction*
- designed for veterans
- easy start
- customizeable by default

## Roadmap
- list of differences between next.js & create-react-app
- serverless template - in development
- Using your own (external) template - under consideration
- Eject feature - under consideration

## Contributing
