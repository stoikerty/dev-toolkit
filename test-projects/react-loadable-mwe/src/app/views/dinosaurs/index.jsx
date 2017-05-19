import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import React from 'react'

const Main = Loadable({
  loader: () => import('./main'),
  LoadingComponent: () => null
})

const TRex = Loadable({
  loader: () => import('./t-rex'),
  LoadingComponent: () => null
})

const Triceratops = Loadable({
  loader: () => import('./triceratops'),
  LoadingComponent: () => null
})

const Dinosaurs = ({ match }) => (
  <Switch>
    <Route exact component={ Main } path={ match.path } />
    <Route exact component={ TRex } path={ `${ match.path }/t-rex` } />
    <Route exact component={ Triceratops } path={ `${ match.path }/triceratops` } />
  </Switch>
)

Dinosaurs.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string
  })
}

Dinosaurs.displayName = 'Dinosaurs'

export default Dinosaurs
