import { useSelector } from 'react-redux'

const useFoods = which => {
  let foods = useSelector(state => state.food.foods)

  if (which === 'meals') return foods.filter(food => !food.recipe)
  if (which === 'recipes') return foods.filter(food => food.recipe !== '')
}

export default useFoods
