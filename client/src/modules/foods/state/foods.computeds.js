import { computed } from 'easy-peasy'

const foodsComputeds = {
  mealsFoods: computed(state => state.foods.filter(food => food.meal !== 0)),
  
  previewMealFoods: computed(state => state.foods.filter(food => food.meal === 0)),
}

export default foodsComputeds
