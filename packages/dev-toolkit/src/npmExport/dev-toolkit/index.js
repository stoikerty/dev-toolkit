import { log } from '../../utilities';

export default ({ command, envs }) => {
  log({ title: 'programmatic-usage', message: `Running command \`${command}\``, useSeparator: true });

  // Set environment variables programmatically
  Object.keys(envs).map((key) => {
    process.env[key] = envs[key];
    return null;
  });

  // Set the command for bootstrap to pick it up
  process.env.DEV_TOOLKIT_COMMAND = command;

  import('../../bin/bootstrap');
};
