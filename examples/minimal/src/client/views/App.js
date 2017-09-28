import React from 'react';

import { isProd, isDev, customEnvContent } from 'src/settings';

// Use this as the entry-point for your app.
export default () => (
  <div>
    {'App View runnings in:'}<br/>
    {`Production? ${isProd}`}<br/>
    {`Development? ${isDev}`}<br/>
    <br/>
    {`customEnvContent: ${customEnvContent}`}<br/>
  </div>
);
