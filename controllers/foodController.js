const Food = require('../models/Food')
const Reference = require('../models/Reference')
const Recipe = require('../models/Recipe')

// Middleware
exports.foodById = async (req, res, next) => {
  Food.findById(req.params.foodId)
    .populate('reference')
    .then(food => {
      if (!food) return res.status(400).json({ message: 'Food not found' })
      req.food = food
      next()
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

// CRUD
exports.createFood = async (req, res) => {
  const { quantity, recipe, meal } = req.body

  try {
    const reference = await Reference.findOne({
      name: req.params.referenceName,
      user: req.userId,
    })

    if (!reference)
      return res.status(400).json({ message: 'Reference does not exist' })

    const food = await Food({
      user: req.userId,
      reference: reference._id,
      name: reference.name,
      protein: quantity * reference.protein,
      carbs: quantity * reference.carbs,
      fat: quantity * reference.fat,
      isDirty: reference.isDirty,
      isAlcohol: reference.isAlcohol,
      meal,
      recipe,
      quantity,
    })

    food.save()

    food
      .populate({ path: 'reference', select: 'protein carbs fat -_id' })
      .execPopulate()
      .then(food => res.send(food))

    // return res.send(food)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.createFoodsByRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ name: req.params.recipeName }).select(
      '_id'
    )

    const recipeFoods = await Food.find({ recipe: recipe._id })
      .lean()
      .select('-_id -recipe')

    const mealFoods = recipeFoods.map(food => ({
      ...food,
      meal: req.body.meal,
    }))

    const newFoods = await Food.create(mealFoods)

    const newFoodsIds = newFoods.map(food => food._id)

    const resFoods = await Food.find({ _id: { $in: newFoodsIds } }).populate({
      path: 'reference',
      select: 'protein carbs fat -_id',
    })

    return res.json(resFoods)
  } catch (error) {}
}

exports.readFoods = async (req, res) => {
  try {
    const foods = await Food.find({ user: req.userId }).populate({
      path: 'reference',
      select: 'protein carbs fat',
    })

    if (!foods) throw 'Foods not found'
    return res.json(foods)
  } catch (error) {
    return res.status(400).json({ msg: 'Foods not found' })
  }
}

exports.updateFood = async (req, res) => {
  const { quantity, meal, reference, name } = req.body

  const food = {
    user: req.userId,
    protein: quantity * reference.protein,
    carbs: quantity * reference.carbs,
    fat: quantity * reference.fat,
    name,
    quantity,
    meal,
  }

  Food.findByIdAndUpdate(req.params.foodId, food, {
    new: true,
  })
    .populate({ path: 'reference', select: 'protein carbs fat' })
    .then(food => {
      if (!food) return res.status(400).json({ message: 'Food not found' })
      else res.send(food)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.getFoodByName = async (req, res) => {
  console.log(req.userId)
  try {
    const reference = await Reference.findOne({
      name: req.params.foodName,
      user: req.userId,
    }).select('protein carbs fat -_id')

    // return res.json(reference)

    if (!reference) throw 'Reference not found'

    const food = await Food({
      name: req.params.foodName,
      ref: reference,
      user: req.userId,
    })

    return res.json(food)
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.deleteFood = async (req, res) => {
  Food.findByIdAndDelete(req.params.foodId)
    .then(food => {
      if (!food) return res.status(400).json({ message: 'Food not found' })
      else res.send(food)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteAllFood = async (req, res) => {
  try {
    await Food.deleteMany({ user: req.userId, recipe: null })
    res.send({ message: 'Foods Cleared' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Deprecated?
exports.createManyFoods = async (req, res) => {
  try {
    const foods = await Food.create(...req.body.data)
    res.send(foods.ops)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
