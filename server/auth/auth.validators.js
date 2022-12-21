const { check } = require('express-validator')
const { validate } = require('../middleware/validate')

exports.signUpValidator = [
  check('firstName', 'Please insert a first name').notEmpty(),

  check('lastName', 'Please insert a last name').notEmpty(),

  check('name', 'Please insert a name').notEmpty(),

  check('email', 'Please insert a valid email').isEmail(),

  check(
    'units',
    'Please insert a valid unit (metric, imperial [legacy: kg or lb])'
  ).isIn(['metric', 'imperial', 'kg', 'lb']),

  check('gender', 'Please insert a valid gender (m, f or o)').isIn([
    'm',
    'f',
    'o',
  ]),

  check('birthdate', 'Please insert a valid birthdate').isDate(),

  check('password', 'Please insert a password').notEmpty(),

  check('password', 'Password must be at least 6 characters long').isLength({
    min: 6,
  }),

  check('passwordConfirm', 'Please insert a confirmation password').notEmpty(),
]

exports.signInValidator = [
  check('email', 'Please insert a valid email').isEmail(),

  check('password', 'Password is required').notEmpty(),
]

Object.keys(exports).forEach(key => exports[key].push(validate))
