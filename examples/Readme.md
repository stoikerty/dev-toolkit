A collection of examples of how dev-toolkit can be used.

## minimal
If you want to start a project from scratch, this is your best starting point.
This example contains no routing, it will give you out of the box:
- simple client app with
  - hot-reload for development
  - 1 view called `App.js`
- simple server app for
  - rendering the layout on request
  - pre-rendering the layout to an html file
- `settings.js`-file to be shared between client & server with
  - exported `isServer` & `isClient` to know wich rendering-mode the client-app is in
  - exported env's (customize which ones are passed through in dev-toolkit's config-file)
