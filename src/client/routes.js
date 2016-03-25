import React from 'react';
import { Route } from 'react-router';

import AppBody from './views/AppBody';
import ExamplePage from './views/ExamplePage';
import NoMatch404 from './views/NoMatch404';

// Use AppBody as surrounding container for all routes
export default (
  <Route path="/" component={AppBody}>

    {/* Make an example-page available */}
    <Route path="example-page" component={ExamplePage}/>

    {/* Use a view for non-existing routes */}
    <Route path="*" component={NoMatch404}/>

  </Route>
);
