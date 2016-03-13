import serveStatic from 'serve-static';

// Preconfigure the `app`-object
import './bootstrap';
import router from './router';

// Serve the files in the public folder
app.server.instance.use(serveStatic('build'));

// Use React Router
app.server.instance.use(router);
