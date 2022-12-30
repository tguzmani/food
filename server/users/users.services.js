const usersRepository = require('./users.mongo.repository')
const dayjs = require('dayjs')

exports.readUserById = async userId => {
  await updateUserMembership(userId)

  const user = await usersRepository.readUserById(userId)

  if (!user) {
    throw new Error(`User not found`)
  }

  return user
}

exports.updateUser = async (userId, user) => {
  return await usersRepository.updateUser(userId, user)
}

const updateUserMembership = async userId => {
  const user = await usersRepository.readUserById(userId)

  const isMembershipExpired = dayjs().isBefore(user.isPremiumUntil)

  await usersRepository.updateUser(userId, {
    isPremium: isMembershipExpired,
  })
}
