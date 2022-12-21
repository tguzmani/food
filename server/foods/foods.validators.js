const { check, body } = require('express-validator')
const { validate } = require('../middleware/validate')

exports.createFoodValidator = [
  check('quantity', 'Please insert food quantity in grams').notEmpty(),

  check('referenceName', "Please insert food's reference name").notEmpty(),

  check('meal', 'Please insert food meal number').notEmpty(),
]

exports.updateFoodValidator = [
  check('name', 'Please insert a name').notEmpty(),

  body('protein', 'Please insert protein amount').toFloat(),

  body('carbs', 'Please insert carbs amount').toFloat(),

  body('fat', 'Please insert fat amount').toFloat(),
]

Object.keys(exports).forEach(key => exports[key].push(validate))
