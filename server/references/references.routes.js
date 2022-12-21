const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  createReferenceValidator,
  updateReferenceValidator
} = require('../references/references.validators')

console.log('updateReferenceValidator', updateReferenceValidator)

const referencesController = require('../references/references.controller')

router.post(
  '/',
  [auth, ...createReferenceValidator],
  referencesController.createReference
)

router.post('/copy-to-user', auth, referencesController.copyReferencesToUser)

router.get('/', auth, referencesController.readReferencesByUserId)

router.put(
  '/:referenceId',
  [auth, ...updateReferenceValidator],
  referencesController.updateReference
)

router.delete('/:referenceId', auth, referencesController.deleteReference)

module.exports = router
