const foodsRepository = require('./foods.mongo.repository')
const referencesServices = require('../references/references.services')

const createFoodByReference = (reference, quantity, meal, userId) => {
  const protein = reference.protein * quantity
  const carbs = reference.carbs * quantity
  const fat = reference.fat * quantity

  const food = {
    ...reference,
    reference: reference._id,
    name: reference.name,
    user: userId, 
    _id: undefined,
    meal,
    quantity,
    protein,
    carbs,
    fat,
  }

  return food
}

// exports.createManyFoods = async (referenceName, quantity, meal, userId) => {
exports.createManyFoods = async (foods, userId) => {
  let newFoods = []

  for (food of foods) {
    const { name: referenceName, quantity, meal } = food

    const reference = await referencesServices.readReferenceByName(
      referenceName,
      userId
    )

    if (!reference) continue

    const newFood = createFoodByReference(reference, quantity, meal, userId)

    newFoods.push(newFood)
  }

  if (newFoods.length > 0) return await foodsRepository.createManyFoods(newFoods)

  return newFoods
}

exports.readFoodsByUserId = async userId => {
  return await foodsRepository.readFoodsByUserId(userId)
}

exports.readFoodById = async foodId => {
  return await foodsRepository.readFoodById(foodId)
}

exports.readFoodsByReference = async referenceId => {
  return await foodsRepository.readFoodsByReference(referenceId)
}

exports.updateFood = async (
  foodId,
  userId,
  quantity,
  meal,
  reference,
  name
) => {
  const food = {
    user: userId,
    protein: quantity * reference.protein,
    carbs: quantity * reference.carbs,
    fat: quantity * reference.fat,
    name,
    quantity,
    meal,
  }

  return await foodsRepository.updateFood(foodId, food)
}

exports.deleteFood = async (foodId, userId) => {
  const food = await foodsRepository.readFoodByUserId(foodId, userId)

  if (!food) throw new Error('Food not found')

  return await foodsRepository.deleteFood(foodId)
}

exports.deleteAllFoodsFromDay = async userId => {
  await foodsRepository.deleteAllFoodsByUser(userId)
}
