exports.mapFoodToDatabase = (food) => ({
  ...food,
  protein: food.protein.toFixed(2),
  fat: food.fat.toFixed(2),
  carbs: food.carbs.toFixed(2),
})