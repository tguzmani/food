const { check, body } = require('express-validator')
const { validate } = require('../middleware/validate')

exports.createReferenceValidator = [
  check('name', 'Please insert a name').notEmpty(),

  body('protein', 'Please insert protein amount').toFloat(),

  body('carbs', 'Please insert carbs amount').toFloat(),

  body('fat', 'Please insert fat amount').toFloat(),
]

exports.updateReferenceValidator = [
  check('name', 'Please insert a name').notEmpty(),

  body('protein', 'Please insert protein amount').toFloat(),

  body('carbs', 'Please insert carbs amount').toFloat(),

  body('fat', 'Please insert fat amount').toFloat(),
]

Object.keys(exports).forEach(key => exports[key].push(validate))
