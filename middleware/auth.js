// const jwt = require("jsonwebtoken")

// exports.auth = (req, res, next) => {
//   // Get token from header
//   let token = req.header("Authorization")

//   // Check if not token
//   if (!token) {
//     return res.status(401).json({
//       msg: "No token, authorization denied",
//     })
//   }

//   token = token.replace("Bearer ", "")

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.userId = decoded._id
//     console.log("req.userId :>> ", req.userId)
//   } catch (error) {
//     return res.status(401).json({ msg: "Token is not valid" })
//   }

//   next()
// }

const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  let token = req.cookies.t

  if (!token) {
    return res.status(401).json({
      message: 'No token, authorization denied',
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
