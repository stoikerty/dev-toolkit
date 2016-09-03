import React, { PropTypes } from 'react';

import s from './Shell/_style.scss';

// `Shell.js`
// --------------------
// Having a Shell is perfect if you want to transition between different features of your app or
// managing scroll-state and navigation.

const displayName = 'Shell';
const defaultProps = {};
const propTypes = {
  children: PropTypes.node,
};

const component = (props) => (
  <div className={s.shell}>
    {props.children}
  </div>
);

component.displayName = displayName;
component.defaultProps = defaultProps;
component.propTypes = propTypes;
export default component;
