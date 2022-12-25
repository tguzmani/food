const foodsServices = require('./foods.services')

exports.createFood = async (req, res) => {
  const { name: referenceName, quantity, meal } = req.body

  try {
    const food = await foodsServices.createFood(
      referenceName,
      quantity,
      meal,
      req.userId
    )

    const foodWithReferences = await foodsServices.readFoodById(food._id)

    res.send(foodWithReferences)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.createManyFoods = async (req, res) => {
  try {
    const foods = await foodsServices.createManyFoods(
      req.body,
      req.userId
    )

    res.send(foods)
  } catch (error) {
    return res.status(400).send({ error: error.stack })
  }
}

exports.readFoodsByUserId = async (req, res) => {
  try {
    const foods = await foodsServices.readFoodsByUserId(req.userId)

    res.send(foods)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.updateFood = async (req, res) => {
  const { quantity, meal, reference, name } = req.body

  try {
    const food = await foodsServices.updateFood(
      req.params.foodId,
      req.userId,
      quantity,
      meal,
      reference,
      name
    )

    res.send(food)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.deleteFood = async (req, res) => {
  const { foodId } = req.params

  try {
    const food = await foodsServices.deleteFood(foodId, req.userId)

    res.send(food)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.deleteAllFoodsFromDay = async (req, res) => {
  try {
    const food = await foodsServices.deleteAllFoodsFromDay(req.userId)

    res.send(food)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}
