const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')

const foodsController = require('../foods/foods.controller')

router.post('/', isAuth, foodsController.createFood)

router.get('/', isAuth, foodsController.readFoodsByUserId)

router.put('/:foodId', isAuth, foodsController.updateFood)

router.delete('/all', isAuth, foodsController.deleteAllFoodsFromDay)

router.delete('/:foodId', isAuth, foodsController.deleteFood)

module.exports = router
