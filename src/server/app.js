import serveStatic from 'serve-static';
import router from './router';

// Preconfigure the `app`-object
import './bootstrap';

// launch server later with webpack using start-method
app.server.start = (options={ message:null })=>{
  // serve build folder
  app.server.instance.use(serveStatic('build'));

  // Listen on specified port
  app.server.instance.listen(app.server.port, function(error) {
    if (error) {
      app.error(error);
    } else {
      app.log('==> 🌎 Listening on http://' + app.server.hostname + ':%s/', app.server.port);
      if (options.message){
        app.log(options.message);
      }
    }
  });

  // start react-router
  app.server.instance.use(router);
};
