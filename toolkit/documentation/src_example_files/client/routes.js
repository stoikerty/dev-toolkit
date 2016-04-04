import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppBody from './views/AppBody';
import Home from './views/Home';
import NoMatch404 from './views/NoMatch404';

import ExamplePage from './views/ExamplePage';

// `routes.js`
// -----------
// This looks like a component but is in effect just a routing definition.
// These routes are rendered both on the client and on the server, therefore
// they are imported in `RouterContainer` and in `server/router.js`.

// Use AppBody as surrounding container for all routes
export default (
  <Route path="/" component={AppBody}>

    {/* A view for the home page */}
    <IndexRoute path="" component={Home}/>

    {/* Make an example-page available */}
    <Route path="example-page" component={ExamplePage}/>

    {/* Use a view for non-existing routes */}
    <Route path="*" component={NoMatch404}/>

  </Route>
);
