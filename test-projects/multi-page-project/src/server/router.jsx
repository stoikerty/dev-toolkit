import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { useServerRendering } from 'src/settings';
import routes from '../client/routes';

// React Router Boilerplate
// Note:
//   Adapted from server-rendering example: https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/ServerRendering.md
export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const reactHtml = useServerRendering ?
        ReactDOM.renderToString(<RouterContext {...renderProps} />) : '';

      // Render `layout`-template using Handlebars
      res.status(200).render('layout', {
        reactHtml,
        isDev: global.isDev,
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};
