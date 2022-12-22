import React from 'react'
// import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import theme from './theme'
import { ThemeProvider } from '@mui/styles'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/routing/PrivateRoute'

import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Day from './components/pages/Day'
import MeasuresPage from './components/pages/MeasuresPage'
import RecipesPage from './components/pages/RecipesPage'
import ReferencesPage from './components/pages/ReferencesPage'
import ProfilePage from './components/pages/ProfilePage'
import StatisticsPage from './components/pages/StatisticsPage'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <>
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/' component={Day} />
              <PrivateRoute exact path='/measures' component={MeasuresPage} />
              <PrivateRoute
                exact
                path='/references'
                component={ReferencesPage}
              />
              <PrivateRoute exact path='/recipes' component={RecipesPage} />
              <PrivateRoute
                exact
                path='/statistics'
                component={StatisticsPage}
              />
              <PrivateRoute exact path='/profile' component={ProfilePage} />
              <Route path='*' component={NotFound} />
            </Switch>
          </>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
