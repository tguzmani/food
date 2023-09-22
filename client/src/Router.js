import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
import SettingsPage from 'components/pages/SettingsPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />

        <Route
          exact
          path='/'
          element={
            <PrivateRoute>
              <Day />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/measurements'
          element={
            <PrivateRoute>
              <MeasuresPage />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/references'
          element={
            <PrivateRoute>
              <ReferencesPage />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/settings'
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path='/statistics'
          element={
            <PremiumRoute>
              <StatisticsPage />
            </PremiumRoute>
          }
        />

        <Route
          exact
          path='/users'
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
