const authServices = require('./auth.services')
const usersServices = require('../users/users.services')
const signToken = require('../common/signToken')

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000
// days * hours * minutes * seconds * milliseconds

exports.signUp = async (req, res) => {
  try {
    const newUser = await authServices.signUp(req.body)

    const token = signToken({ _id: newUser._id })

    res.cookie('t', token, { 
      maxAge: ONE_YEAR, 
      httpOnly: true, 
      sameSite: 'none', 
      secure: true 
    })

    res.send(newUser)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const userId = await authServices.signIn(email, password)
    const user = await usersServices.readUserById(userId)

    const token = signToken({ _id: userId })

    res.cookie('t', token, { 
      maxAge: ONE_YEAR, 
      httpOnly: true, 
      sameSite: 'none', 
      secure: true 
    })

    res.send(user)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.signOut = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Sign out success' })
}
