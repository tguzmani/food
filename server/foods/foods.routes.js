const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  createFoodValidator,
  updateFoodValidator
} = require('../foods/foods.validators')

const foodsController = require('../foods/foods.controller')

router.post(
  '/',
  [auth, ...createFoodValidator],
  foodsController.createFood
)

router.get('/', auth, foodsController.readFoodsByUserId)

router.put(
  '/:foodId',
  [auth, ...updateFoodValidator],
  foodsController.updateFood
)

router.delete('/:foodId', auth, foodsController.deleteFood)

module.exports = router
