#!/usr/bin/env node
import bootstrap from '../utils/bootstrap';

bootstrap().then(() => {
  global.toolkitScript = 'watch';
  global.scriptOptions = {};

  console.log(`run ${global.toolkitScript} command`);
  import(`../../commands/${global.toolkitScript}`);
});
