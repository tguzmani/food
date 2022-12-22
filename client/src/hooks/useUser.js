import { useStoreState } from "easy-peasy"

const useUser = () => {
  const { user } = useStoreState(state => state.user)

  return user
}

export default useUser