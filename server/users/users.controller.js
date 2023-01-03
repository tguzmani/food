const usersModel = require('./users.model')
const usersServices = require('./users.services')

exports.readUserById = async (req, res) => {
  try {
    const user = await usersServices.readUserById(req.userId)

    return res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


exports.readUsers = async (req, res) => {
  try {
    const users = await usersServices.readUsers()

    return res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


exports.updateUser = async (req, res) => {
  try {

    const user = await usersServices.updateUser(req.userId, req.body)

    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.stack })
  }
}

exports.updateUserByAdmin = async (req, res) => {
  try {

    const user = await usersServices.updateUser(req.params.userId, req.body)

    res.send(user)
  } catch (error) {
    res.status(500).json({ error: error.stack })
  }
}