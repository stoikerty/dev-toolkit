import './generateBuild';

global.usesServerRendering = true;

// Use the express production server
import serverApp from '../../src/server/app';
const server = new serverApp;

// start the server
server.start();
