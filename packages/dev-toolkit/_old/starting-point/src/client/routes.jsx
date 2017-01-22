import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Shell from './views/Shell';
import Home from './views/features/Home';

// `routes.js`
// -----------
// This looks like a component but is in effect just a routing definition.
// These routes are rendered both on the client and on the server, therefore
// they are imported in `RouterContainer` and in `server/router.js`.

// NOTE: Even if you think you "don't need" server-rendering, you probably will do
//   if you have any intention of statically rendering your markup and using
//   react-router's dynamic routing.

// Use Shell as surrounding container for all routes
export default (
  <Route path="/" component={Shell}>

    {/* A view for the home page */}
    <IndexRoute component={Home} />
  </Route>
);
