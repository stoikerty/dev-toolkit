import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';

const serverViews = path.resolve(process.cwd(), 'src/server/views');
const rootComponentPath = path.resolve(process.cwd(), 'src/client/RootComponent');
const handlebarsInstance = expressHandlebars.create().engine;

// This file is called individually via programmatic usage in `handler.js`
export default ({ assets, buildFolder }) => {
  // return a Promise to dev-toolkit
  return new Promise((resolve, reject) => {
    // Load Client App via RootComponent
    import(rootComponentPath).then(module => {
      const RootComponent = module.default;
      // Here handlebars is used to generate the html without express and without webpack
      this.handlebarsInstance
        .render(path.join(serverViews, 'template.hbs'), {
          assets,
          renderedHtml: renderToString(<RootComponent />),
        })
        .then(html => {
          // Generated html is written to html file in build folder
          console.log('html: ', html);
        });
    });
  });
};
