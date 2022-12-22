import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const useAuth = () => {
  const { readProfile } = useStoreActions(actions => actions.auth)
  const { user, isAuthenticated } = useStoreState(state => state.auth)
  
  const isAuth = user && isAuthenticated

  // useEffect(() => {
  //   if (user) readProfile()
  // }, [])


  return isAuth
}

export default useAuth
