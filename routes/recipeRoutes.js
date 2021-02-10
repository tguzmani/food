const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const {
  createRecipe,
  createRecipeFromFoods,
  readRecipe,
  readRecipes,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController')

router.post('/', auth, createRecipe)
router.post('/fromFoods', auth, createRecipeFromFoods)
router.get('/all', auth, readRecipes)
router.get('/:recipeId', auth, readRecipe)
router.put('/:recipeId', auth, updateRecipe)
router.delete('/:recipeId', auth, deleteRecipe)

module.exports = router
