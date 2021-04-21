import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { readUser } from '../../state/auth/authActions'
import Navigation from '../layout/Navigation/Navigation'

const PrivateRoute = ({
  readUser,
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    readUser()
  }, [readUser])

  const condition = !isAuthenticated && !loading

  return (
    <Navigation>
      <Route
        {...rest}
        render={props =>
          condition ? <Redirect to='/login' /> : <Component {...props} />
        }
      />
    </Navigation>
  )
}

const mapActionsToProps = { readUser }

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute)
