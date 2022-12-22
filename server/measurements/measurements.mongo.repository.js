const Measurement = require('./measurements.model')
const measurementsMapper = require('./measurements.mapper')
const dayjs = require('dayjs')

exports.createMeasurement = async (weight, userId) => {
  return await Measurement.create({ weight, user: userId })
}

exports.readMeasurementById = async measurementId => {
  return await Measurement.findOne({ _id: measurementId })
    .populate({ path: 'reference', select: 'protein carbs fat -_id' })
    .exec()
}

exports.readMeasurementsByUserId = async userId => {
  const MAX_DAYS_IN_MONTH = 31

  return await Measurement.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(MAX_DAYS_IN_MONTH)
}

exports.readMeasurementByUserId = async (measurementId, userId) => {
  return await Measurement.findOne({ _id: measurementId, user: userId })
}

exports.readMeasurementsByDate = async (initialDate, finalDate, userId) => {
  return await Measurement.find({
    user: userId,
    createdAt: {
      $gte: dayjs(initialDate),
      $lte: dayjs(finalDate),
    },
  })
}

exports.updateMeasurement = async (measurementId, measurement) => {
  return await Measurement.findByIdAndUpdate(measurementId, measurement, {
    new: true,
  })
}

exports.deleteMeasurement = async measurementId => {
  return await Measurement.findByIdAndDelete(measurementId)
}

exports.deleteAllMeasurementsByUser = async userId => {
  return await Measurement.deleteMany({ user: userId })
}