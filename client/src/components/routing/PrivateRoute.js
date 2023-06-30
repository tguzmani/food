import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../layout/layout'
import useAuth from 'hooks/useAuth'
import { useStoreState, useStoreActions } from 'easy-peasy'
import BackdropLoading from '../layout/BackdropLoading'
import useConditionalRead from 'hooks/useConditionalRead'
import CompleteSetup from 'components/profile/CompleteSetup'

const PrivateRoute = ({ children }) => {
  const isAuth = useAuth()
  const location = useLocation().pathname
  const navigate = useNavigate()

  const { loading, user } = useStoreState(state => state.users)
  const { readUser } = useStoreActions(actions => actions.users)

  useConditionalRead([{ name: readUser, condition: !user }])

  const showCompleteSetup =
    user && !user.isSetupComplete && location !== '/profile'

  useEffect(() => {
    if (!isAuth && !loading && !user) {
      navigate('/login')
    }
  }, [isAuth, loading, navigate])

  if (loading && !user) return <BackdropLoading open={loading} />

  return (
    <Layout>
      {!showCompleteSetup && children}
      {showCompleteSetup && <CompleteSetup />}
    </Layout>
  )
}

export default PrivateRoute
