import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/routing/PrivateRoute'

import Dashboard from './components/pages/Dashboard'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'

import Notification from './components/layout/Notification'
import Navigation from './components/layout/Navigation'

const App = () => {
  return (
    <Provider store={store}>
      <Notification />
      {/* <Navigation /> */}
      <Router>
        <>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route path='*' component={NotFound} />
          </Switch>
        </>
      </Router>
    </Provider>
  )
}

export default App
