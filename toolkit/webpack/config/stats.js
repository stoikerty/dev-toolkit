import { env } from '../../_userSettings';

export default {
  colors: true,
  timings: true,
  reasons: true,

  assets: env.VERBOSE_LOGGING,
  modules: env.VERBOSE_LOGGING,
  source: env.VERBOSE_LOGGING,
  errorDetails: env.VERBOSE_LOGGING,
  children: env.VERBOSE_LOGGING,
  hash: env.VERBOSE_LOGGING,
  version: env.VERBOSE_LOGGING,
  chunks: env.VERBOSE_LOGGING,
  chunkModules: env.VERBOSE_LOGGING,
  cached: env.VERBOSE_LOGGING,
  cachedAssets: env.VERBOSE_LOGGING,
};
