// Make sharedEnv's globally available for universal import of `dev-toolkit/settings` to work
export default ({ settings }) => {
  // eslint-disable-next-line no-underscore-dangle
  global.__devToolkitSettings = settings;
};
