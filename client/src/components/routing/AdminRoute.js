import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../layout/Layout'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'
import PrivateRoute from './PrivateRoute'

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuth = useAuth()
  const { loading, user, userIsAdmin } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(state => state.users)

  useConditionalRead([{ name: readUser, condition: !user }])

  if (loading && !user) return <BackdropLoading open={loading} />

  const condition = isAuth && userIsAdmin

  return condition ? <PrivateRoute component={Component} /> : <Redirect to='/' />
}

export default AdminRoute
