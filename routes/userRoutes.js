const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const { readUser, updateUser, test } = require('../controllers/userController')

router.get('/', auth, readUser)
router.put('/', auth, updateUser)
router.get('/test', auth, test)

module.exports = router
