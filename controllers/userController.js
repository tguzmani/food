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
  try {
    let user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    })

    user = await User.findByIdAndUpdate(
      req.userId,
      { goals: user.macroGoals },
      { new: true }
    )

    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
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
