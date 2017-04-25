import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import asyncComponent from './components/asyncComponent';

const Page1 = asyncComponent(
  () => import('./components/Page1').then(module => module.default),
  { name: 'Page 1' }
);
const Page2 = asyncComponent(
  () => import('./components/Page2').then(module => module.default),
  { name: 'Page 2' }
);
const Home = asyncComponent(
  () => import('./components/Home').then(module => module.default),
  { name: 'Home' }
);

const App = () => (
  <Router>
    <div className="App">
      <ul>
        <li><Link to="/">{'Home'}</Link></li>
        <li><Link to="/page1">{'Page 1'}</Link></li>
        <li><Link to="/page2">{'Page 2'}</Link></li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </div>
  </Router>
);

export default App;
