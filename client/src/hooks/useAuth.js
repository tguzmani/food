import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const useAuth = () => {
  const { readUserById } = useStoreActions(actions => actions.auth)
  const { user, isAuthenticated } = useStoreState(state => state.auth)

  useEffect(() => {
    if (user) readUserById()
  }, [])

  const isAuth = user && isAuthenticated

  return isAuth
}

export default useAuth
