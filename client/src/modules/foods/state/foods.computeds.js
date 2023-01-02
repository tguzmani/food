import { computed } from 'easy-peasy'

const ALCOHOL_UNIT = 14

const foodsComputeds = {
  alcoholUnits: computed(
    state =>
      state.foods?.reduce(
        (total, food) => (food.isAlcohol ? total + food.quantity : total + 0),
        0
      ) / ALCOHOL_UNIT
  ),

  mealsFoods: computed(state => state.foods.filter(food => food.meal !== 0)),

  previewMealFoods: computed(state =>
    state.foods.filter(food => food.meal === 0)
  ),
}

export default foodsComputeds
