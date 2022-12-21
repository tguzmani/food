const usersRepository = require('./users.mongo.repository');

exports.readUserById = async (userId) => {
  const user = await usersRepository.readUserById(userId);

  if (!user) {
    throw new Error(`User not found`);
  }

  return user
}