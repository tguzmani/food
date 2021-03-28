import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/routing/PrivateRoute'

import Dashboard from './components/pages/Dashboard'
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Day from './components/pages/Day'
import Measures from './components/pages/Measures'
import Recipes from './components/pages/Recipes'
import References from './components/pages/References'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <>
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute exact path='/day' component={Day} />
              <PrivateRoute exact path='/measures' component={Measures} />
              <PrivateRoute exact path='/references' component={References} />
              <PrivateRoute exact path='/recipes' component={Recipes} />
              <Route path='*' component={NotFound} />
            </Switch>
          </>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
