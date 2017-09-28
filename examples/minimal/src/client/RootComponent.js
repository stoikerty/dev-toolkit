// This is the main component that both the client & the server touch first.
//
// It's likely that this component will stay mostly empty since it sits at the root.
// It might contain your chosen routing solution or redux-provider.
import React from 'react';
import { object } from 'prop-types';
import { isClient } from 'dev-toolkit/settings';
import App from './views/App';

// This should log both on the client and the server, remove once you understand how it works.
console.log(`Client App has run on ${isClient ? 'Client' : 'Server'}...`);

const displayName = 'RootComponent';
const component = () => (
  <App />
);

component.displayName = displayName;
export default component;
