#!/usr/bin/env node
import bootstrap from '../utils/bootstrap';

bootstrap().then(() => {
  global.toolkitScript = 'build';
  global.scriptOptions = {};

  import(`../../commands/${global.toolkitScript}`);
});
