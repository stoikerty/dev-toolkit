import { App, flushWebpackRequireWeakIds } from './app'
import { JS_TAGS, getLoadableScripts } from './util'
import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import serve from 'koa-static'
import { StaticRouter } from 'react-router'

const app = new Koa()

app.use(serve('public'))

app.use(ctx => {
  ctx.type = 'text/html'

  const context = {}
  const reactBody = renderToString(
    <StaticRouter context={ context } location={ ctx.path }>
      <App />
    </StaticRouter>
  )

  if (context.url) {
    ctx.redirect(context.url)
  } else {
    const requires = flushWebpackRequireWeakIds()
    const loadableScripts = getLoadableScripts(requires)

    const body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>React Loadable MWE</title>
        </head>
        <body>
          <div id="root">${ reactBody }</div>
          ${ JS_TAGS }
          ${ loadableScripts }
        </body>
      </html>
    `

    ctx.body = body
  }
})

app.listen(3000)
