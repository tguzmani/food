const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  foodById,
  createFood,
  createFoodsByRecipe,
  createManyFoods,
  readFood,
  getFoodByName,
  readFoods,
  deleteFood,
  deleteAllFood,
  updateFood,
} = require('../controllers/foodController')

const { referenceById } = require('../controllers/referenceController')

const foodsController = require('../foods/foods.controller')

router.post('/', auth, foodsController.createFood)
router.post('/byRecipe/:recipeName', auth, createFoodsByRecipe)
router.get('/', auth, foodsController.readFoodsByUserId)
router.put('/:foodId', auth, foodsController.updateFood)
router.delete('/:foodId', auth, foodsController.deleteFood)
router.delete('/', auth, deleteAllFood)

router.get('/byName/:foodName', auth, getFoodByName)
router.post('/createMany/', auth, createManyFoods)

router.param('foodId', foodById)
// router.param('referenceId', referenceById)

module.exports = router
