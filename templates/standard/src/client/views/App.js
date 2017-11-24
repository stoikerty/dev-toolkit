import React from 'react';

import { isProd, isDev } from 'dev-toolkit/settings';
import { customEnvContent } from 'src/settings';

// Use this as the entry-point for your app.
export default () => (
  <div>
    {'App View running in:'}
    {`Production? ${isProd}`}
    <br />
    {`Development? ${isDev}`}
    <br />
    <br />
    {`customEnvContent: ${customEnvContent}`}
    <br />
  </div>
);
