import React from 'react';
import { Route } from 'react-router';

import AppBody from './views/AppBody';
import ExamplePage from './views/ExamplePage';
import NoMatch404 from './views/NoMatch404';

export default (
  <Route path="/" component={AppBody}>
    {/* Make needed component available */}
    <Route path="example-page" component={ExamplePage}/>

    {/* Screen for non-existing routes */}
    <Route path="*" component={NoMatch404}/>
  </Route>
);
