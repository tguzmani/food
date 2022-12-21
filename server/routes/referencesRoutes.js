const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  referenceById,
  createReference,
  readReference,
  readReferences,
  deleteReference,
  updateReference,
  createManyReferences,
  getReferencesByUser,
} = require('../controllers/referenceController')

const { createReferenceValidator } = require('../references/references.validators')

const referencesController = require('../references/references.controller')

router.post('/', [auth, ...createReferenceValidator], referencesController.createReference)
router.get('/', auth, referencesController.readReferencesByUserId)
router.put('/:referenceId', referencesController.updateReference)
router.delete('/:referenceId', auth, referencesController.deleteReference)

router.post('/copy-to-user', auth, referencesController.copyReferencesToUser)
// router.get('/all', auth, readReferences)

// admin routes
router.post('/admin/createMany/:userId', auth, createManyReferences)

router.param('referenceId', referenceById)

module.exports = router
