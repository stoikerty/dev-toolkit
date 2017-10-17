/* eslint-disable no-underscore-dangle */
import { runCommand } from '../../utilities';

export default ({ command, options }) => {
  runCommand({ command, options, programmatic: true });
};
