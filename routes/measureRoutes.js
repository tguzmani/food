const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const {
  measureById,
  readMeasures,
  createMeasure,
  createManyMeasures,
  deleteMeasure,
  getMeasureBlockByDate,
  getLastMeasure,
  updateMeasure,
  readMeasuresByQuery,
  // readMeasures,
  // getMeasuresByName,
  // getAllMeasuress,
  // deleteAllMeasures,
} = require('../controllers/measureController')

router.post('/', auth, createMeasure)
router.get('/all', auth, readMeasures)
router.get('/q', auth, readMeasuresByQuery)
router.put('/:measureId', auth, updateMeasure)
router.delete('/:measureId', auth, deleteMeasure)

// admin routes
router.post('/admin/createMany/:userId', auth, createManyMeasures)

router.param('measureId', measureById)

module.exports = router
