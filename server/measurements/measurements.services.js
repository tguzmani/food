const measurementsRepository = require('./measurements.mongo.repository')
const referencesServices = require('../references/references.services')

exports.createMeasurement = async (weight, userId) => {
  return await measurementsRepository.createMeasurement(weight, userId)
}

exports.readMeasurementsByUserId = async userId => {
  return await measurementsRepository.readMeasurementsByUserId(userId)
}

exports.readMeasurementById = async measurementId => {
  return await measurementsRepository.readMeasurementById(measurementId)
}

exports.readMeasurementsByReference = async referenceId => {
  return await measurementsRepository.readMeasurementsByReference(referenceId)
}

exports.readMeasurementsByDate = async (initialDate, finalDate, userId) => {
  return await measurementsRepository.readMeasurementsByDate(
    initialDate,
    finalDate,
    userId
  )
}

exports.updateMeasurement = async (measurementId, measurement) => {
  return await measurementsRepository.updateMeasurement(
    measurementId,
    measurement
  )
}

exports.deleteMeasurement = async (measurementId, userId) => {
  const measurement = await measurementsRepository.readMeasurementByUserId(
    measurementId,
    userId
  )

  if (!measurement) throw new Error('Measurement not found')

  return await measurementsRepository.deleteMeasurement(measurementId)
}

exports.deleteAllMeasurementsFromDay = async userId => {
  await measurementsRepository.deleteAllMeasurementsByUser(userId)
}
