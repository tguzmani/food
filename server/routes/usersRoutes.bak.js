const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  readUser,
  updateUser,
  readGoals,
} = require('../controllers/userController')

router.get('/', auth, readUser)
router.put('/', auth, updateUser)
router.get('/goals', auth, readGoals)

module.exports = router
