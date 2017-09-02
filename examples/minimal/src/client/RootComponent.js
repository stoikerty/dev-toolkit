import React from 'react';
import { object } from 'prop-types';

import Shell from './views/Shell';

const displayName = 'RootComponent';
const component = ({ route }) => (
  <Shell />
);

component.displayName = displayName;
export default component;
