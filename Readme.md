<h1 align="center">dev-toolkit</h1>
<p align="center">
Jump-start your <code>react</code>-powered Universal App<br />
<em>Designed for Veterans</em>
</p>
<br />

`dev-toolkit` provides you with an easy and quick way to get started with a pre-rendered & server-rendered app. After creating your starting point with the `init` command, you get full customisability out of the box.

[![Travis branch](https://img.shields.io/travis/stoikerty/dev-toolkit/master.svg)](https://github.com/stoikerty/dev-toolkit)
[![Vulnerabilities for dev-toolkit](https://snyk.io/test/github/stoikerty/dev-toolkit/badge.svg?targetFile=src%2Fpackages%2Fdev-toolkit%2Fpackage.json)](https://snyk.io/test/github/stoikerty/dev-toolkit?targetFile=src%2Fpackages%2Fdev-toolkit%2Fpackage.json)
[![npm](https://img.shields.io/npm/v/dev-toolkit.svg)](https://www.npmjs.com/package/dev-toolkit)
[![npm](https://img.shields.io/npm/dm/dev-toolkit.svg)](https://www.npmjs.com/package/dev-toolkit)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/stoikerty/dev-toolkit.svg?style=social)](https://twitter.com/intent/tweet?text=An%20easy%20and%20quick%20way%20to%20start%20a%20pre-rendered%20and%20server-rendered%20%23react%20app!%20https%3A%2F%2Fgithub.com%2Fstoikerty%2Fdev-toolkit)

### Quick Start

```bash
$ npm install -g dev-toolkit
```

```bash
# Initialise a project with optional name, template, comments
# The comments explain how the `dev-toolkit` works with the template
$ dev-toolkit init [project_name] [--template template_name] [--skip-comments]
```

#### List of available templates

- [`minimal`](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md#minimal) [![Vulnerabilities for minimal template](https://snyk.io/test/github/stoikerty/dev-toolkit/badge.svg?targetFile=src%2Ftemplates%2Fminimal%2Fpackage.json)](https://snyk.io/test/github/stoikerty/dev-toolkit?targetFile=src%2Ftemplates%2Fminimal%2Fpackage.json)
- [`standard`](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md#standard)* [![Vulnerabilities for standard template](https://snyk.io/test/github/stoikerty/dev-toolkit/badge.svg?targetFile=src%2Ftemplates%2Fstandard%2Fpackage.json)](https://snyk.io/test/github/stoikerty/dev-toolkit?targetFile=src%2Ftemplates%2Fstandard%2Fpackage.json)
- [`with-eslint`](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md#with-eslint) [![Vulnerabilities for with-eslint template](https://snyk.io/test/github/stoikerty/dev-toolkit/badge.svg?targetFile=src%2Ftemplates%2Fwith-eslint%2Fpackage.json)](https://snyk.io/test/github/stoikerty/dev-toolkit?targetFile=src%2Ftemplates%2Fwith-eslint%2Fpackage.json)
- [`with-sass`](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md#with-sass) [![Vulnerabilities for with-sass template](https://snyk.io/test/github/stoikerty/dev-toolkit/badge.svg?targetFile=src%2Ftemplates%2Fwith-sass%2Fpackage.json)](https://snyk.io/test/github/stoikerty/dev-toolkit?targetFile=src%2Ftemplates%2Fwith-sass%2Fpackage.json)

<small>* used by default when initialising a new project</small>

## 📖 Docs

- [Templates](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md)

## 🌟 Features

`dev-toolkit` is intentionally minimalist on features. It's meant to get you started quickly with a project where you _will_ need customisability instead of mandating which technologies that you must use (such as Jest).

* **SSR by default**
* **Ability to pre-render** _after_ webpack creates a build
* **Complete control over client & server**<br>
  _see [template docs](https://github.com/stoikerty/dev-toolkit/blob/master/docs/templates.md)_
* **Start your project without bloat** _or guidance_ if you like it rough<br>
  _`dev-toolkit init --template minimal --skip-comments`_
* **Full control over your server-rendered template**<br>
  _no webpack lock-in such as with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) unless you choose to_
* **hot-reload on client & server**, opt-in for both
* **Easy way to integrate any nodeHooks for SSR usage**<br>
  _using `/nodeHooks.js`_
* **Easy way to add webpack plugins and presets**<br>
  _using `/dev-toolkit.config.js`_
* **use select environment variables on client**<br>
  _using `import { sharedEnvs } from 'dev-toolkit/settings'`_
* **you can use sane if-statements, [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements)**<br>
  _`<If condition={true}> ... </If>` will compile down to `&&`-syntax_

### Why No CSS by default?

The aim of dev-toolkit is to be unopinionated so that it can be useful in many different scenarios. Therefore only the most necessary dependencies are included and other additions may be provided by yourself (see the other template examples for guidance).

With CSS-in-JS solutions on the rise, it would be unwise to include dependencies for `css-modules`, `sass` or `less` in every project that has `dev-toolkit` as a dependency, it would introduce additional installation time and bloat.

### Roadmap

* More docs on extending with config, how dev-toolkit works, choices
* serverless template
* Using your own (external) template - under consideration
* Eject feature - under consideration
* list differences between dev-toolkit, next.js & create-react-app

## Contributing
See [`Contributing.md`](https://github.com/stoikerty/dev-toolkit/blob/master/Contributing.md)
