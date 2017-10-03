import React from 'react';
import { object } from 'prop-types';
import { isClient } from 'dev-toolkit/settings';
import App from './views/App';

console.log(`Client App has run on ${isClient ? 'Client' : 'Server'}...`);

const displayName = 'RootComponent';
const component = () => (
  <App />
);

component.displayName = displayName;
export default component;
