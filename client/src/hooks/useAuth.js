import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const useAuth = () => {
  const { readUser } = useStoreActions(actions => actions.users)
  const { user, isAuthenticated } = useStoreState(state => state.users)

  return user && isAuthenticated
}

export default useAuth
