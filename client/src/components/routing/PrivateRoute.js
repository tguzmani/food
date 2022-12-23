import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navigation from '../layout/Navigation/Navigation'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy';
import BackdropLoading from '../layout/BackdropLoading';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuth = useAuth()
  const { loading, user } = useStoreState(state => state.auth)
  const { readProfile } = useStoreActions(state => state.auth)

  useEffect(() => {
    readProfile()
  }, [])

  if (loading && !user) return <BackdropLoading open={loading} />

  return (
    <Navigation>
      <Route
        {...rest}
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to='/login' />
        }
      />
    </Navigation>
  )
}

export default PrivateRoute
