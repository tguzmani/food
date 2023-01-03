const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth')

const authController = require('../auth/auth.controller')

const { signInValidator, signUpValidator } = require('../auth/auth.validators')

router.post('/sign-up', signUpValidator, authController.signUp)
router.post('/sign-in', signInValidator, authController.signIn)
router.post('/sign-out', isAuth, authController.signOut)

module.exports = router
