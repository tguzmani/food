import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'
import PrivateRoute from './PrivateRoute'

const PremiumRoute = ({ children }) => {
  const isAuth = useAuth()
  const { loading, user, userIsPremium } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(state => state.users)
  const navigate = useNavigate()

  useConditionalRead([{ name: readUser, condition: !user }])

  useEffect(() => {
    if (isAuth && userIsPremium) {
      navigate('/')
    }
  }, [isAuth, loading, userIsPremium, navigate])

  if (loading && !user) return <BackdropLoading open={loading} />

  return <PrivateRoute>{children}</PrivateRoute>
}

export default PremiumRoute
