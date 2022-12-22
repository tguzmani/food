const referencesServices = require('./references.services')

exports.createReference = async (req, res) => {
  try {
    const reference = await referencesServices.createReference(
      req.body,
      req.userId
    )

    res.send(reference)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.readReferencesByUserId = async (req, res) => {
  try {
    const references = await referencesServices.readReferencesByUserId(
      req.userId
    )

    res.send(references)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.updateReference = async (req, res) => {
  const { referenceId } = req.params

  console.log(req.body)

  try {
    const reference = await referencesServices.updateReference(
      referenceId,
      req.body
    )

    res.send(reference)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.deleteReference = async (req, res) => {
  const { referenceId } = req.params
  try {
    const reference = await referencesServices.deleteReference(referenceId, req.userId)

    res.send(reference)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

exports.copyReferencesToUser = async (req, res) => {
  const { sourceUserId, destinyUserId } = req.body

  try {
    const references = await referencesServices.copyReferencesToUser(
      sourceUserId,
      destinyUserId
    )

    res.send(references)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
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

// Deprecated?
exports.readReference = (req, res) => {
  return res.json(req.product)
}
