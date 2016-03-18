import serveStatic from 'serve-static';
import router from './router';

// Preconfigure the `app`-object
import './bootstrap';

// launch server later with webpack using start-method
app.server.start = ()=>{
  // serve build folder
  app.server.instance.use(serveStatic('build'));

  // Listen on specified port
  app.server.instance.listen(app.server.port, function(error) {
    if (error) {
      app.error(error);
    } else {
      app.log('==> 🌎  Listening on port %s. Open up http://' + app.server.hostname + ':%s/ in your browser.', app.server.port, app.server.port);
    }
  });

  // start react-router
  app.server.instance.use(router);
};
