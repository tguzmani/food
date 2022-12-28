import { useStoreState } from 'easy-peasy'

const useAuth = () => {
  const { user, isAuthenticated, loading } = useStoreState(state => state.users)

  return user && isAuthenticated && !loading
}

export default useAuth
