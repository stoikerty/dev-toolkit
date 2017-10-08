import React from 'react';

import { isProd, isDev, customEnvContent } from 'src/settings';
import './style.scss';

// Use this as the entry-point for your app.
export default () => (
  <div className="app">
    {'App View running in:'}
    <br />
    {`Production? ${isProd}`}
    <br />
    {`Development? ${isDev}`}
    <br />
    <br />
    {`customEnvContent: ${customEnvContent}`}
    <br />
  </div>
);
