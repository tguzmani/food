import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../layout/Layout'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy';
import BackdropLoading from '../layout/BackdropLoading';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuth = useAuth()
  const { loading, user } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(state => state.users)

  useEffect(() => {
    readUser()
  }, [])

  if (loading && !user) return <BackdropLoading open={loading} />

  return (
    <Layout>
      <Route
        {...rest}
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to='/login' />
        }
      />
    </Layout>
  )
}

export default PrivateRoute
