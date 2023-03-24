import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import Layout from '../layout/Layout'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'
import CompleteSetup from 'components/profile/CompleteSetup'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useAuth()
  const location = useLocation().pathname

  const { loading, user } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(actions => actions.users)

  useConditionalRead([{ name: readUser, condition: !user }])

  if (loading && !user) return <BackdropLoading open={loading} />

  const showCompleteSetup =
    user && !user.isSetupComplete && location !== '/profile'

  return (
    <Layout>
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            showCompleteSetup ? (
              <CompleteSetup />
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    </Layout>
  )
}

export default PrivateRoute
