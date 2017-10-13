import React from 'react';

import s from './style.scss';

// Use this as the entry-point for your app.
export default () => (
  <div className={s.app}>
    {'App with Sass'}
    <br />
    <br />
    <span className={s.color1}>{'so '}</span>
    <span className={s.color2}>{'colorful '}</span>
    <span className={s.color3}>{'! '}</span>
    <br />
    <span className={s.color4}>{'and '}</span>
    <span className={s.wiggleLeftRight}>{'with other cool things'}</span>
    <span className={s.color6}>{' like '}</span>
    <span className={s.wiggleUpDown}>{'animations'}</span>
    <span> </span>
    <span className={s.wiggleRotate}>{'!'}</span>
  </div>
);
