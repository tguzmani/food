export const getTotalMacro = (foods, macro) =>
  foods.reduce((total, food) => total + food[macro], 0)

export const getTotalCalories = foods =>
  foods.reduce(
    (total, food) => total + (food.protein + food.carbs) * 4 + food.fat * 9,
    0
  )
