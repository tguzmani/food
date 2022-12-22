const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const usersController = require('./users.controller')

router.get('/', auth, usersController.readUserById)
router.put('/', auth, usersController.updateUser)

module.exports = router
