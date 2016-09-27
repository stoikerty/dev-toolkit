import React from 'react';

import s from './Home/_style.scss';

const displayName = 'Home';
const defaultProps = {};
const propTypes = {};

const component = () => (
  <div className={s.home}>
    {'Home Feature'}
  </div>
);

component.displayName = displayName;
component.defaultProps = defaultProps;
component.propTypes = propTypes;
export default component;
