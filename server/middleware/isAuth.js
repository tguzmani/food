const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  let token = req.cookies.t

  if (!token) {
    return res.status(401).json({
      message: 'No token, isAuthorization denied',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded._id

  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' })
  }

  next()
}

module.exports = isAuth
