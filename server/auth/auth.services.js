const usersRepository = require('../users/users.mongo.repository')
const referencesServices = require('../references/references.services')
const encrypt = require('../common/encrypt')

exports.signUp = async userData => {
  const user = await usersRepository.readUserByEmail(userData.email)

  if (user) throw new Error('User with this email already exists')

  if (userData.password !== userData.passwordConfirm)
    throw new Error("Passwords don't match")

  const hashedPassword = await encrypt.hash(userData.password)

  const newUser = await usersRepository.createUser({
    ...userData,
    password: hashedPassword,
  })

  newUser.password = undefined

  if (process.env.SOURCE_USER_ID)
    await referencesServices.copyReferencesToUser(
      process.env.SOURCE_USER_ID,
      newUser._id
    )

  return newUser
}

exports.signIn = async (email, password) => {
  const user = await usersRepository.readUserByEmail(email)

  if (!user) throw new Error('There is no user with this email')

  const passwordsMatch = await encrypt.compare(password, user.password)

  if (!passwordsMatch) throw new Error('Password is incorrect')

  return user._id
}
