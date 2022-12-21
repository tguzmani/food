const Measure = require('../models/Measure')
const moment = require('moment')

// Middleware
exports.measureById = async (req, res, next, id) => {
  try {
    const measure = await Measure.findById(id)
    if (!measure) throw 'Measure not found'
    req.measure = measure
    next()
  } catch (error) {
    return res.status(400).json({ error: 'Measure not found' })
  }
}

// CRUD
exports.createMeasure = async (req, res) => {
  Measure.create({
    ...req.body,
    user: req.userId,
  })
    .then(measure => res.send(measure))
    .catch(error => res.status(400).json({ error: error.message }))
}

exports.readMeasures = async (req, res) => {
  Measure.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .limit(31)
    .then(measures => res.send(measures))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.readMeasuresByQuery = async (req, res) => {
  const initialDate = req.query.from
  const finalDate = req.query.to

  if (!initialDate || !finalDate) {
    return res
      .status(400)
      .json({ error: 'Initial and final dates are required' })
  }

  Measure.find({
    user: req.userId,
    createdAt: {
      $gte: moment(initialDate),
      $lte: moment(finalDate),
    },
  })
    .then(measures => res.json(measures))
    .catch(error => res.status(400).json({ error: error.message }))
}

exports.updateMeasure = async (req, res) => {
  Measure.findByIdAndUpdate(req.params.measureId, req.body, {
    new: true,
  })
    .then(measure => {
      if (!measure)
        return res.status(400).json({ message: 'Measure not found' })
      else res.send(measure)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteMeasure = async (req, res) => {
  Measure.findByIdAndDelete(req.params.measureId)
    .then(measure => {
      if (!measure)
        return res.status(400).json({ message: 'Measure not found' })
      else res.send(measure)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

// Deprecated?
exports.createManyMeasures = async (req, res) => {
  let data = req.body.data.map(measure => ({
    ...measure,
    user: req.params.userId,
  }))

  try {
    const measures = await Measure.create(data)
    res.send(measures.ops)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
