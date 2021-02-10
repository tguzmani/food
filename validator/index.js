const { check } = require("express-validator")

exports.userSignUpValidator = [
  check("name", "Please insert a name").notEmpty(),

  check("password", "Please insert a password")
    .not()
    .isEmpty(),

  check("password", "Password must be at least 6 characters long").isLength({
    min: 6
  }),

  check("email", "Please insert a valid email").isEmail()
]

exports.userSignInValidator = [
  check("email", "Please insert a valid email").isEmail(),
  check("password", "Password is required")
    .not()
    .isEmpty()
]
