import React from 'react';
import { object } from 'prop-types';

import { isClient } from 'src/settings';
import Shell from './views/Shell';

// This should log both on the client and the server
console.log(`Client App has run on ${isClient ? 'Client' : 'Server'}...`);

const displayName = 'RootComponent';
const component = ({ route }) => (
  <Shell />
);

component.displayName = displayName;
export default component;
