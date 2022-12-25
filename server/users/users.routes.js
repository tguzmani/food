const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const usersController = require('./users.controller')

router.put('/', auth, usersController.updateUser)
router.get('/profile', auth, usersController.readUserById)

module.exports = router
