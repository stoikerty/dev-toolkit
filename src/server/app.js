import serveStatic from 'serve-static';

// Preconfigure the `app`-object
import './bootstrap';
import router from './router';

// launch server later using start-method
app.server.start = ()=>{
  app.server.instance.use(serveStatic('build'));

  app.server.instance.listen(app.server.port, function(error) {
    if (error) {
      console.error(error)
    } else {
      console.info('==> 🌎  Listening on port %s. Open up http://' + app.server.hostname + ':%s/ in your browser.', app.server.port, app.server.port)
    }
  })

  app.server.instance.use(router);
};
