export const getTotalMacro = (foods, macro) =>
  foods.reduce((total, food) => total + food[macro], 0)

export const getTotalCalories = foods =>
  foods.reduce(
    (total, food) => total + (food.protein + food.carbs) * 4 + food.fat * 9,
    0
  )

export const getCleanCalories = foods =>
  foods.reduce(
    (total, food) =>
      food.isDirty
        ? total + 0
        : total + (food.protein + food.carbs) * 4 + food.fat * 9,
    0
  )

export const getCleanliness = foods =>
  (getCleanCalories(foods) / getTotalCalories(foods)) * 100

const ALCOHOL_UNIT = 16

export const getAlcoholUnits = foods =>
  foods.reduce(
    (total, food) => (food.isAlcohol ? total + food.quantity : total + 0),
    0
  ) / ALCOHOL_UNIT
