import { useStoreState } from "easy-peasy"

const useUser = () => {
  const { user } = useStoreState(state => state.auth)

  return user
}

export default useUser