/* eslint-disable no-undef, no-underscore-dangle */

// Shared settings between client and server.
//
// A global handed over by a webpack plugin allows us to retrieve environment variables.
// eslint-disable-next-line no-undef
export const creatingBuild = typeof devToolkitSettings !== typeof undefined;

// Warn if the initial node-command wasn't spawned via the `dev-toolkit`-cli
if (!creatingBuild && typeof global.__devToolkitSettings === typeof undefined) {
  console.log(
    '\n⚠️  Could not get shared dev-toolkit settings. Are you using the `dev-toolkit`-cli?\n'
  );
}

// Get Settings via Node global
const devToolkitSettingsServer = !creatingBuild && global.__devToolkitSettings;

// If we're not creating a build, we're server-rendering the client app.
// Therefore we'll want to use `process.env` instead of the build settings.
export const sharedEnvs = creatingBuild
  ? devToolkitSettings.sharedEnvs
  : devToolkitSettingsServer.sharedEnvs;

// Make usePreRender setting available
export const usePreRender = creatingBuild
  ? devToolkitSettings.usePreRender
  : devToolkitSettingsServer.usePreRender;

// Assign booleans for each environment we might be in
export const isProd = sharedEnvs.NODE_ENV === 'production';
export const isDev = sharedEnvs.NODE_ENV === 'development';
export const isTest = sharedEnvs.NODE_ENV === 'test';

// Detect whether the client-app is being rendered on the client or on the server
export const isServer = !creatingBuild && sharedEnvs.NODE_ENV !== 'test';
export const isClient = !isServer;
