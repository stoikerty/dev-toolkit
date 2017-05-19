import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import React from 'react'

const Home = Loadable({
  loader: () => import('app/views/home'),
  LoadingComponent: () => null
})

const Dinosaurs = Loadable({
  loader: () => import('app/views/dinosaurs'),
  LoadingComponent: () => null
})

const App = () => (
  <div style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
    <nav style={{ backgroundColor: '#ccc', width: '100%' }}>
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/dinosaurs">Dinosaurs</Link>
    </nav>
    <Switch>
      <Route exact component={ Home } path="/" />
      <Route component={ Dinosaurs } path="/dinosaurs" />
    </Switch>
  </div>
)

App.displayName = 'App'

export default App
