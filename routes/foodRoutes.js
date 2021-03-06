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

router.post('/:referenceName', auth, createFood)
router.post('/byRecipe/:recipeName', auth, createFoodsByRecipe)
router.get('/all', auth, readFoods)
router.put('/:foodId', auth, updateFood)
router.delete('/', auth, deleteAllFood)

router.get('/byName/:foodName', auth, getFoodByName)
router.delete('/:foodId', deleteFood)
router.post('/createMany/', auth, createManyFoods)

router.param('foodId', foodById)
// router.param('referenceId', referenceById)

module.exports = router
