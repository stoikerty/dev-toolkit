import React, { PropTypes } from 'react';

import s from './Shell/_style.scss';

import test from 'src/client/utils/test';

const displayName = 'Shell';
const defaultProps = {};
const propTypes = {
  children: PropTypes.node,
};

test();

const component = (props) => (
  <div className={s.shell}>
    {props.children}
  </div>
);

component.displayName = displayName;
component.defaultProps = defaultProps;
component.propTypes = propTypes;
export { component as Shell };
