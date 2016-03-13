import React from 'react';
import { Route } from 'react-router';

import AppBody from './AppBody';

const examplePage = ()=> (
  <div> { 'Example Page' } </div>
);
const NoMatch404 = ()=> (
  <div> { '404 - No route matches your request' } </div>
);

export default (
  <Route path="/" component={AppBody}>
    {/* Make needed component available */}
    <Route path="example-page" component={examplePage}/>

    {/* Screen for non-existing routes */}
    <Route path="*" component={NoMatch404}/>
  </Route>
);
