import { useStoreState } from 'easy-peasy'

const useMealNumbers = () => {
  const { foods } = useStoreState(state => state.foods)

  const mealNumbers = foods
    .filter(food => !isNaN(food.meal))
    .map(food => food.meal)

  const maxMeals = mealNumbers.length === 0 ? 0 : Math.max(...mealNumbers)

  let numbers = []

  for (var i = 1; i <= maxMeals; i++) {
    numbers.push(i)
  }

  return numbers.sort((a, b) => b - a)
}

export default useMealNumbers
