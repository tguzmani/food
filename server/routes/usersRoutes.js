const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const usersController = require('../users/users.controller')

const {
  updateUser,
  readGoals,
} = require('../controllers/userController')

router.get('/', auth, usersController.readUserById)
router.put('/', auth, updateUser)
router.get('/goals', auth, readGoals)

module.exports = router
