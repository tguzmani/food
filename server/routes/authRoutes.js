const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')

const { signup, signin, signout } = require('../controllers/authController')

const { userSignUpValidator, userSignInValidator } = require('../validator')

router.post('/signup', userSignUpValidator, signup)
router.post('/signin', userSignInValidator, signin)
router.get('/signout', auth, signout)

module.exports = router
