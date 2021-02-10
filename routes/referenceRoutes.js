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

router.post('/', auth, createReference)
router.get('/all', auth, readReferences)
router.put('/:referenceId', updateReference)
router.delete('/:referenceId', auth, deleteReference)

router.post('/create/multiple', auth, createManyReferences)
// router.get('/all', auth, readReferences)

// admin routes
router.post('/admin/createMany/:userId', auth, createManyReferences)

router.param('referenceId', referenceById)

module.exports = router
