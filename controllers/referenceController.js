const Reference = require('../models/Reference')
const Food = require('../models/Food')

// Middleware
exports.referenceById = async (req, res, next, id) => {
  Reference.findById(req.params.referenceId)
    .then(reference => {
      if (!reference)
        return res.status(400).json({ message: 'Reference not found' })
      req.reference = reference
      next()
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

// CRUD
exports.createReference = async (req, res) => {
  Reference.create({ ...req.body, user: req.userId })
    .then(reference => res.send(reference))
    .catch(error => res.status(400).json({ error: error.message }))
}

exports.readReferences = async (req, res) => {
  Reference.find({ user: req.userId })
    .sort({ name: 1 })
    .then(references => res.send(references))
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.updateReference = async (req, res) => {
  Reference.findByIdAndUpdate(req.params.referenceId, req.body, {
    new: true,
  })
    .then(reference => {
      if (!reference)
        return res.status(400).json({ message: 'Reference not found' })
      else res.send(reference)
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteReference = async (req, res) => {
  Food.find({ reference: req.params.referenceId })
    .then(foods => {
      console.log(foods)
      if (foods.length > 0)
        return res.status(400).json({
          message:
            'There are foods using this reference. Remove them first and then try again',
        })

      Reference.findByIdAndDelete(req.params.referenceId)
        .then(reference => {
          if (!reference)
            return res.status(400).json({ message: 'Reference not found' })
          else res.send(reference)
        })
        .catch(error => res.status(500).json({ error: error.message }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}

// Deprecated?
exports.readReference = (req, res) => {
  return res.json(req.product)
}

exports.createManyReferences = async (req, res) => {
  const data = req.body.map(reference => ({
    ...reference,
    user: req.params.userId,
    _id: undefined,
  }))
  try {
    const references = await Reference.create(data)
    res.send({ references })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
