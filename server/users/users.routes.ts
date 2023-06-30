import express from 'express'
import isAuth from '../middleware/is-auth'
import isAdmin from '../middleware/isAdmin'

import * as usersController from './users.controller'

const router = express.Router()

router.get('/profile', isAuth, usersController.readUserById)
router.put('/', isAuth, usersController.updateUser)

router.get('/', [isAuth, isAdmin], usersController.readUsers)
router.put('/:userId', [isAuth, isAdmin], usersController.updateUserByAdmin)

export default router
