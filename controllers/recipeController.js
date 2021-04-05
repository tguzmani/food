const Food = require('../models/Food')
const Recipe = require('../models/Recipe')

exports.createRecipe = async (req, res) => {
  const recipe = Recipe({ ...req.body, user: req.userId })

  recipe
    .save()
    .then(recipe => res.send(recipe))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.createRecipeFromFoods = async (req, res) => {
  try {
    const recipe = Recipe({
      ...req.body.foods,
      name: req.body.name,
      user: req.userId,
    })

    const newFoods = req.body.foods.map(food => ({
      ...food,
      _id: undefined,
      meal: undefined,
      recipe: recipe._id,
    }))

    await Food.create(newFoods)

    await recipe.save()

    res.send(recipe)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.readRecipes = async (req, res) => {
  Recipe.find()
    .then(recipes => res.send(recipes))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readRecipe = async (req, res) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      if (!recipe) return res.status(400).json({ message: 'Recipe not found' })
      else res.send(recipe)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateRecipe = async (req, res) => {
  Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {
    new: true,
  })
    .then(recipe => {
      if (!recipe) return res.status(400).json({ message: 'Recipe not found' })
      else res.send(recipe)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteRecipe = async (req, res) => {
  try {
    await Food.deleteMany({ recipe: req.params.recipeId })

    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId)
    return res.json(recipe)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
