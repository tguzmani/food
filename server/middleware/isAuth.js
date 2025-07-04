const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  let token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null

  if (!token) {
    return res.status(401).json({
      message: 'No token, isAuthorization denied',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded._id
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  next()
}

module.exports = isAuth
