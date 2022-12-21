const usersServices = require('./users.services')

exports.readUserById = async (req, res) => {
  try {
    const user = await usersServices.readUserById(req.userId)
    console.log(req.userId)

    return res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
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
