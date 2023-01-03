const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin')

const usersController = require('./users.controller')

router.get('/profile', isAuth, usersController.readUserById)
router.put('/', isAuth, usersController.updateUser)

router.get('/', [isAuth, isAdmin], usersController.readUsers)
router.put('/:userId', [isAuth, isAdmin], usersController.updateUserByAdmin)

module.exports = router
