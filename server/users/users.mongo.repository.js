const User = require('./users.model')
const dayjs = require('dayjs')

exports.readUserById = async userId => {
  return await User.findById(userId).select('-password')
}

exports.readUsers = async () => {
  return await User.find()
}

exports.readUserByEmail = async email => {
  return await User.findOne({ email })
}

exports.createUser = async user => {
  return await User.create({
    ...user,

    name: `${user.firstName} ${user.lastName}`,
    sex: user.gender,
  })
}

exports.updateUser = async (userId, userData) => {
  let user = await User.findByIdAndUpdate(userId, userData, {
    new: true,
  })

  user = await User.findByIdAndUpdate(
    userId,
    { goals: user.macroGoals },
    { new: true }
  )

  return user
}
