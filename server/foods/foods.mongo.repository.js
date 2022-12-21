const Food = require('../models/Food')
const foodsMapper = require('./foods.mapper')

exports.createFood = async (food, userId) => {
  return await Food.create({ ...food, user: userId })
}

exports.readFoodById = async foodId => {
  return await Food.findOne({ _id: foodId })
    .populate({ path: 'reference', select: 'protein carbs fat -_id' })
    .exec()
}

exports.readFoodsByUserId = async userId => {
  return await Food.find({ user: userId }).populate({
    path: 'reference',
    select: 'protein carbs fat',
  })
}

exports.readFoodByUserId = async (foodId, userId) => {
  return await Food.findOne({ _id: foodId, user: userId })
}

exports.readFoodsByReference = async (referenceId) => {
  return await Food.find({ reference: referenceId })
}

exports.updateFood = async (foodId, food) => {
  return await Food.findByIdAndUpdate(foodId, food, {
    new: true,
  })
    .populate({ path: 'reference', select: 'protein carbs fat' })
    .exec()
}

exports.deleteFood = async foodId => {
  return await Food.findByIdAndDelete(foodId)
}

exports.deleteAllFoodsByUser = async userId => {
  return await Food.deleteMany({ user: userId })
}

