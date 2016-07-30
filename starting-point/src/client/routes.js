import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Shell } from './Shell';
const Page = () => (
  <div>{'some text'}</div>
);

// `routes.js`
// -----------
// This looks like a component but is in effect just a routing definition.
// These routes are rendered both on the client and on the server, therefore
// they are imported in `RouterContainer` and in `server/router.js`.

// Use Shell as surrounding container for all routes
export default (
  <Route path="/" component={Shell}>

    {/* A view for the home page */}
    <IndexRoute component={Page} />
  </Route>
);
