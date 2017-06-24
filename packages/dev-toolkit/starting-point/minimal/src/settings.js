// Shared settings between client and server.

// A global handed over by a webpack plugin allows us to retrieve environment variables.
// eslint-disable-next-line no-undef
const creatingBuild = typeof buildSettings !== typeof undefined;

// If we're not creating a build, we're server-rendering the client app.
// Therefore we'll want to use `process.env` instead of the build settings.
// eslint-disable-next-line no-undef, jsx-control-statements/jsx-jcs-no-undef
const env = creatingBuild ? buildSettings.env : process.env;

// Detect whether the client-app is being rendered on the client or on the server
export const isServer = !creatingBuild && env.NODE_ENV !== 'test';
export const isClient = !isServer;

// Assign booleans for each environment we might be in
export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
export const isStaging = env.NODE_ENV === 'staging';
