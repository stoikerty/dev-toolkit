import { sharedEnvs } from 'dev-toolkit/settings';

export const isProd = sharedEnvs.NODE_ENV === 'production';
export const isDev = sharedEnvs.NODE_ENV === 'development';

export const customEnvContent = sharedEnvs.MY_CUSTOM_ENV;
