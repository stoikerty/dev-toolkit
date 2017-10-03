import React from 'react';

import { isProd, isDev, customEnvContent } from 'src/settings';

export default () => (
  <div>
    {'App View running in:'}<br/>
    {`Production? ${isProd}`}<br/>
    {`Development? ${isDev}`}<br/>
    <br/>
    {`customEnvContent: ${customEnvContent}`}<br/>
  </div>
);
