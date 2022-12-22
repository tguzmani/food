const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

const measurementsController = require('../measurements/measurements.controller')

const {createMeasurementValidator, readMeasurementsByDateValidator} = require('../measurements/measurements.validators')

router.post('/', [auth, ...createMeasurementValidator], measurementsController.createMeasurement)

router.get('/', auth, measurementsController.readMeasurementsByUserId)

router.get('/by-date', [auth, ...readMeasurementsByDateValidator], measurementsController.readMeasurementsByDate)

router.put('/:measurementId', auth, measurementsController.updateMeasurement)

router.delete('/:measurementId', auth, measurementsController.deleteMeasurement)

module.exports = router
