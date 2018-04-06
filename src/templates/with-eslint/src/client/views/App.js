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

    <Choose>
      <When condition={isProd}>{'App is running in Prod'}</When>
      <Otherwise>{'App is not running in Prod'}</Otherwise>
    </Choose>

    <If condition={isDev}>{'App is running in Dev'}</If>
  </div>
);
