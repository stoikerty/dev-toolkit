stk-toolkit
=============

Install Node : [Node Platform](https://nodejs.org/)<br>
**Start Server** : `npm run server`<br>
**Start Asset Watcher** : `npm run watch`<br>
*( `npm run build` builds files for production but needs personalised code-changes within gulp config & tasks )*

Now you should be ready to go to start building your project.

---
If you are looking for a resource to learn from, have a look at the **Human JavaScript** video course titled ["Build an App with React and Ampersand"](http://learn.humanjavascript.com/react-ampersand) or read the ["Human JavaScript Book"](http://read.humanjavascript.com/) by [@HenrikJoreteg](twitter.com/henrikjoreteg)

---
:point_right: A Server is fired on `localhost:2000`, while the watch-runner proxies it through [BrowserSync](http://www.browsersync.io/) on `localhost:3000` (default). BrowserSync will reload on file-changes and synchronise scrolling etc. on any browsers connected to `http://localhost:3000`.

---
with the kind support of BrowserStack ![BrowserStack-Image](https://raw.githubusercontent.com/stoikerty/stk-toolkit/master/browserstack-logo.png)
