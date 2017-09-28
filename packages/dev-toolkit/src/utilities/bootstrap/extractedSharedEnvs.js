export default ({ withEnvs, fromEnvs }) => Object.keys(fromEnvs)
  .filter((key) => withEnvs.indexOf(key) !== -1)
  .reduce((obj, key) => ({ [key]: fromEnvs[key], ...obj }), {});
