const jwt = require('jsonwebtoken')

const usersRepository = require('../users/users.mongo.repository')

const isAuth = async (req, res, next) => {
  const user = await usersRepository.readUserById(req.userId)

  console.log('req.userId', req.userId)

  if (user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' })

  next()
}

module.exports = isAuth
