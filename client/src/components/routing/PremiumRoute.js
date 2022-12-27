import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../layout/Layout'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'

const PremiumRoute = ({ component: Component, ...rest }) => {
  const isAuth = useAuth()
  const { loading, user } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(state => state.users)

  useConditionalRead({ name: readUser, condition: !user })

  if (loading && !user) return <BackdropLoading open={loading} />

  const condition = isAuth && user.isPremium

  return (
    <Layout>
      <Route
        {...rest}
        render={props =>
          condition ? <Component {...props} /> : <Redirect to='/' />
        }
      />
    </Layout>
  )
}

export default PremiumRoute
