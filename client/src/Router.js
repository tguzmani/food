import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Pages
import NotFound from './components/pages/NotFound'
import Login from './components/pages/Login'
import Day from './components/pages/Day'
import MeasuresPage from './components/pages/MeasuresPage'
import ReferencesPage from './components/pages/ReferencesPage'
import ProfilePage from './components/pages/ProfilePage'
import StatisticsPage from './components/pages/StatisticsPage'
import UsersPage from './components/pages/UsersPage'
import Register from './components/pages/Register'

// Routing
import PremiumRoute from 'components/routing/PremiumRoute'
import AdminRoute from 'components/routing/AdminRoute'
import PrivateRoute from './components/routing/PrivateRoute'
import { Box } from '@mui/material'

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/' component={Day} />
          <PrivateRoute exact path='/measurements' component={MeasuresPage} />

          <PrivateRoute exact path='/references' component={ReferencesPage} />
          <PremiumRoute exact path='/statistics' component={StatisticsPage} />
          <PrivateRoute exact path='/profile' component={ProfilePage} />
          <AdminRoute exact path='/users' component={UsersPage} />
          <Route path='*' component={NotFound} />
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default Router
