import React, { PropTypes } from 'react';

import s from './Shell/_style.scss';

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
