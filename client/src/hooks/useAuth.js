import { useStoreState } from 'easy-peasy'

const useAuth = () => {
  const { user, isAuthenticated } = useStoreState(state => state.users)

  return user && isAuthenticated
}

export default useAuth
