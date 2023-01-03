const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/isAuth')

const measurementsController = require('../measurements/measurements.controller')

const {createMeasurementValidator, readMeasurementsByDateValidator} = require('../measurements/measurements.validators')

router.post('/', [isAuth, ...createMeasurementValidator], measurementsController.createMeasurement)

router.get('/', isAuth, measurementsController.readMeasurementsByUserId)

router.get('/by-date', [isAuth, ...readMeasurementsByDateValidator], measurementsController.readMeasurementsByDate)

router.put('/:measurementId', isAuth, measurementsController.updateMeasurement)

router.delete('/:measurementId', isAuth, measurementsController.deleteMeasurement)

module.exports = router
