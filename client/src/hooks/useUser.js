import { useStoreState } from "easy-peasy"

const useUser = () => {
  const { user } = useStoreState(state => state.users)

  return user
}

export default useUser