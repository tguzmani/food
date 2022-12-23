import { useStoreActions } from 'easy-peasy'

const useFoods = () => {
  const { foods } = useStoreActions(state => state.foods)

  console.log('foods', foods)

  return foods
}

export default useFoods
