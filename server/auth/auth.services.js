const usersRepository = require('../users/users.mongo.repository')
const encrypt = require('../common/encrypt')

exports.signUp = async userData => {
  const user = await usersRepository.readUserByEmail(userData.email)

  if (user) throw new Error('User with this email already exists')

  if (userData.password !== userData.passwordConfirm)
    throw new Error('Passwords do not match')

  const hashedPassword = await encrypt.hash(userData.password)

  const newUser = await usersRepository.createUser({
    ...userData,
    password: hashedPassword,
  })

  newUser.password = undefined

  return newUser
}

exports.signIn = async (email, password) => {
  const user = await usersRepository.readUserByEmail(email)

  if (!user) throw new Error('There is no user with this email')

  const passwordsMatch = await encrypt.compare(password, user.password)

  if (!passwordsMatch) throw new Error('Password is incorrect')

  return user._id
}