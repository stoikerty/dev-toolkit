// Detect whether the app is being rendered on the client or on the server
const creatingBuild = typeof buildSettings !== typeof undefined; // eslint-disable-line no-undef

export const env = creatingBuild ? buildSettings.env : process.env; // eslint-disable-line no-undef
export const isDev = env.NODE_ENV === 'development';
export const isServer = !creatingBuild && env.NODE_ENV !== 'test';
export const isClient = !isServer;

export default {
  env,
  isDev,
  isServer,
  isClient,
};
