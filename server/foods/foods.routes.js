const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const foodsController = require('../foods/foods.controller')

// router.post('/', auth, foodsController.createFood)

router.post('/many', auth, foodsController.createManyFoods)

router.get('/', auth, foodsController.readFoodsByUserId)

router.put('/:foodId', auth, foodsController.updateFood)

router.delete('/all', auth, foodsController.deleteAllFoodsFromDay)

router.delete('/:foodId', auth, foodsController.deleteFood)

module.exports = router
