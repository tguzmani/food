const { check, body, query } = require('express-validator')
const { validate } = require('../middleware/validate')

exports.createMeasurementValidator = [
  check('weight', 'Please insert your weight for this day').notEmpty(),
]

exports.readMeasurementsByDateValidator = [
  query('from', 'Please insert a valid initial date').isDate(),

  query('to', 'Please insert a valid end date').isDate(),
]

Object.keys(exports).forEach(key => exports[key].push(validate))
