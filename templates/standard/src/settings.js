// Get environment variables shared between the client & server
// NOTE: `NODE_ENV` is available by default but for security reasons, all other
// environment variables must be declared explicitly in `dev-toolkit.config.js`.
import { sharedEnvs } from 'dev-toolkit/settings';

// Assign booleans for each environment we might be in
export const isProd = sharedEnvs.NODE_ENV === 'production';
export const isDev = sharedEnvs.NODE_ENV === 'development';

// Example of explicitly declared env which will be bundled into client-bundle.
// Make sure you understand how these envs flow through the app & into the client.
// Hint: Try running `npm run dev` and compare output with `npm run start`
export const customEnvContent = sharedEnvs.MY_CUSTOM_ENV;
