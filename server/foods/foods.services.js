const foodsRepository = require('./foods.mongo.repository')
const referencesServices = require('../references/references.services')

exports.createFood = async (referenceName, quantity, meal, userId) => {
  const reference = await referencesServices.readReferenceByName(
    referenceName,
    userId
  )

  if (!reference) throw new Error(`Reference '${referenceName}' not found`)

  const protein = reference.protein * quantity
  const carbs = reference.carbs * quantity
  const fat = reference.fat * quantity

  const food = {
    ...reference,
    reference: reference._id,
    name: reference.name,
    _id: undefined,
    meal,
    quantity,
    protein,
    carbs,
    fat,
  }

  return await foodsRepository.createFood(food, userId)
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