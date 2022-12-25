const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const authController = require('../auth/auth.controller')

const { signInValidator, signUpValidator } = require('../auth/auth.validators')

router.post('/sign-up', signUpValidator, authController.signUp)
router.post('/sign-in', signInValidator, authController.signIn)
router.post('/sign-out', auth, authController.signOut)

module.exports = router
