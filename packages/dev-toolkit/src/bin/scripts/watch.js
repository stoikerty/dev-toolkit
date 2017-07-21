#!/usr/bin/env node
import bootstrap from '../utils/bootstrap';

bootstrap().then(() => {
  global.toolkitScript = 'watch';
  global.scriptOptions = {};

  import(`../../commands/${global.toolkitScript}`);
});
