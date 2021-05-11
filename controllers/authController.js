const User = require('../models/User')
const { genSalt, hash, compare } = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken') // generates signed token

// returns: user object with no password
exports.signup = async (req, res) => {
  // Validation
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() })
  }

  let user = new User(req.body)
  const { password } = req.body

  try {
    // Encrypt password
    const salt = await genSalt(12)
    user.password = await hash(password, salt)

    // Save user
    await user.save()
    user.password = undefined

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie('t', token, { maxAge: 1000 * 60 * 120 * 365, httpOnly: true })
    return res.json({ message: 'Signin successfull' })
    // res.json({ user })
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) })
  }
}

exports.signin = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array()[0].msg, severity: 'error' })
  }

  try {
    // Check email
    const { password } = req.body

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({
        message: 'There is no user with that email. Please sign up',
        severity: 'info',
      })
    }

    // Check password
    const isMatch = await compare(password, user.password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email and password don't match", severity: 'error' })
    }

    user.password = undefined
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    // s * min/s * hour/min * day/hour * year/day
    res.cookie('t', token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
    })
    return res.json({ message: 'Signin successfull' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Signout success' })
}
