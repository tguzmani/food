const User = require('../models/User')

exports.readUser = async (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .then(user => {
      if (!user) res.status(400).send({ message: 'User not found' })
      res.json(user)
    })
    .catch(error => res.status(400).send({ error: error.message }))
}

exports.updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  })
    .then(user => {
      if (!user) return res.status(400).json({ message: 'User not found' })
      else {
        user.password = undefined
        res.send(user)
      }
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readGoals = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    res.json({
      bmr: user.bmr,
      bmrActivity: user.bmrActivity,
      bmrGoal: user.bmrGoal,
      macroGoals: user.macroGoals,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
