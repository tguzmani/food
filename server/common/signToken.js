const jwt = require('jsonwebtoken')

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${24 * 365}h`,
  })
}

module.exports = signToken
