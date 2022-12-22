const measurementsServices = require('./measurements.services')

exports.createMeasurement = async (req, res) => {
  const { weight } = req.body

  try {
    const measurement = await measurementsServices.createMeasurement(
      weight,
      req.userId
    )

    const measurementWithReferences =
      await measurementsServices.readMeasurementById(measurement._id)

    res.send(measurementWithReferences)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.readMeasurementsByUserId = async (req, res) => {
  try {
    const measurements = await measurementsServices.readMeasurementsByUserId(
      req.userId
    )

    res.send(measurements)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.readMeasurementsByDate = async (req, res) => {
  const initialDate = req.query.from
  const finalDate = req.query.to

  try {
    const measurements = await measurementsServices.readMeasurementsByDate(
      initialDate,
      finalDate,
      req.userId
    )

    res.send(measurements)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.updateMeasurement = async (req, res) => {
  const { measurementId } = req.params

  try {
    const measurement = await measurementsServices.updateMeasurement(
      req.measurementId,
      req.body
    )

    res.send(measurement)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.deleteMeasurement = async (req, res) => {
  const { measurementId } = req.params

  try {
    const measurement = await measurementsServices.deleteMeasurement(
      measurementId,
      req.userId
    )

    res.send(measurement)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.deleteAllMeasurementsFromDay = async (req, res) => {
  try {
    const measurement = await measurementsServices.deleteAllMeasurementsFromDay(
      req.userId
    )

    res.send(measurement)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}
