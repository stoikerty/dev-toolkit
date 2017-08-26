import React from 'react';

import { isClient } from 'src/settings';

export default () => (
  <div>
    {'Shell View'}
    <br />
    {`rendering on ${isClient ? 'Client' : 'Server'}`}
  </div>
);
