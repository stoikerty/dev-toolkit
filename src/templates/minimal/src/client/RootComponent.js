// This is the main component that both the client & the server touch first.
//
// It's likely that this component will stay mostly empty since it sits at the root.
// It might contain your chosen routing solution or redux-provider.
import React from 'react';

const displayName = 'RootComponent';
const component = () => <div>{'Minimal App'}</div>;

component.displayName = displayName;
export default component;
