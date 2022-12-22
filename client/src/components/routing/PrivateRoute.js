import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navigation from '../layout/Navigation/Navigation'
import useAuth from 'hooks/useAuth'

const PrivateRoute = ({
  readUser,
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}) => {
  const isAuth = useAuth()

  return (
    <Navigation>
      <Route
        {...rest}
        render={props =>
          // condition ? <Redirect to='/login' /> : <Component {...props} />
          isAuth ? <Component {...props} /> : <Redirect to='/login' />
        }
      />
    </Navigation>
  )
}

export default PrivateRoute
