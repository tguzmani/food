import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'
import PrivateRoute from './PrivateRoute'

const AdminRoute = ({ children }) => {
  const isAuth = useAuth()
  const { loading, user, userIsAdmin } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(state => state.users)
  const navigate = useNavigate()

  useConditionalRead([{ name: readUser, condition: !user }])

  useEffect(() => {
    if (isAuth && userIsAdmin) {
      navigate('/')
    }
  }, [isAuth, loading, userIsAdmin, navigate])

  if (loading && !user) return <BackdropLoading open={loading} />

  return <PrivateRoute>{children}</PrivateRoute>
}

export default AdminRoute
