import React from 'react'
import './App.css'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import theme from './config/theme'
import { ThemeProvider } from '@mui/material/styles'

import PrivateRoute from './components/routing/PrivateRoute'

import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Day from './components/pages/Day'
import MeasuresPage from './components/pages/MeasuresPage'
import ReferencesPage from './components/pages/ReferencesPage'
import ProfilePage from './components/pages/ProfilePage'
import StatisticsPage from './components/pages/StatisticsPage'

import { StoreProvider } from 'easy-peasy'
import store from './config/easy-peasy.store'
import { CssBaseline } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import PremiumRoute from 'components/routing/PremiumRoute'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StoreProvider store={store}>
          <CssBaseline />
          <Router>
            <>
              <Switch>
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/' component={Day} />
                <PrivateRoute exact path='/measurements' component={MeasuresPage} />
                <PrivateRoute
                  exact
                  path='/references'
                  component={ReferencesPage}
                />
                <PremiumRoute
                  exact
                  path='/statistics'
                  component={StatisticsPage}
                />
                <PrivateRoute exact path='/profile' component={ProfilePage} />
                <Route path='*' component={NotFound} />
              </Switch>
            </>
          </Router>
        </StoreProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
