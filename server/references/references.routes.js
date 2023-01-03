const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')

const {
  createReferenceValidator,
  updateReferenceValidator
} = require('../references/references.validators')

const referencesController = require('../references/references.controller')

router.post(
  '/',
  [isAuth, ...createReferenceValidator],
  referencesController.createReference
)

router.post('/copy-to-user', isAuth, referencesController.copyReferencesToUser)

router.get('/', isAuth, referencesController.readReferencesByUserId)

router.put(
  '/:referenceId',
  [isAuth, ...updateReferenceValidator],
  referencesController.updateReference
)

router.delete('/:referenceId', isAuth, referencesController.deleteReference)

module.exports = router
