import React from 'react';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import { renderToString } from 'react-dom/server';

const serverViews = path.resolve(process.cwd(), 'src/server/views');
const rootComponentPath = path.resolve(process.cwd(), 'src/client/RootComponent');
// We're using express-handlebars but you could use vanilla handlebars as well
const handlebarsInstance = expressHandlebars.create();

// This file is called individually via programmatic usage in `handler.js`
export default ({ assets, buildFolder }) => {
  // return a Promise to dev-toolkit
  return new Promise((resolve, reject) => {
    // Load Client App via RootComponent
    import(rootComponentPath).then(module => {
      const RootComponent = module.default;
      // Here handlebars is used to generate the html without express and without webpack
      handlebarsInstance
        .render(path.join(serverViews, 'template.hbs'), {
          assets,
          renderedHtml: renderToString(<RootComponent />),
        })
        .then(html => {
          // Generated html is output immediately
          console.log(html);
        });
    });
  });
};
