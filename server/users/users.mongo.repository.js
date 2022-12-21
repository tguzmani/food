const User = require('./users.model')
const dayjs = require('dayjs')

exports.readUserById = async userId => {
  return await User.findById(userId).select('-password')
}

exports.readUserByEmail = async email => {
  return await User.findOne({ email })
}

exports.createUser = async user => {
  return await User.create({
    ...user,

    name: `${user.firstName} ${user.lastName}`,
    sex: user.gender,
    age: dayjs().diff(user.birthdate, 'year')
  })
}
