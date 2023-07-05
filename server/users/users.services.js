const usersRepository = require('./users.mongo.repository')
const dayjs = require('dayjs')

exports.readUserById = async userId => {
  const user = await usersRepository.readUserById(userId)

  if (!user) {
    throw new Error(`User not found`)
  }

  return user
}


exports.readUsers = async () => {
  return await usersRepository.readUsers()
}

exports.updateUser = async (userId, user) => {
  return await usersRepository.updateUser(userId, user)
}

exports.deleteUser = async (userId) => {
  await usersRepository.deleteUser(userId)
}