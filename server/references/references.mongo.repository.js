const Reference = require('./references.model')
const referencesMapper = require('./references.mapper')

exports.createReference = async (reference, userId) => {
  const mappedReference = referencesMapper.mapReferenceToDatabase(reference)

  return await Reference.create({ ...mappedReference, user: userId })
}

exports.readReferenceByName = async (name, userId) => {
  const reference = await Reference.findOne({ name, user: userId })

  if (reference) referencesMapper.mapReferenceToDomain(reference)

  return reference
}

exports.readReferencesByUserId = async userId => {
  return await Reference.find({ user: userId }).sort({ name: 1 })
}

exports.readReferencesByUserIdPaginated = async (userId, page, perPage) => {
  return await Reference.find({ user: userId })
    .sort({ name: 1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
}

exports.readReferenceByUserId = async (referenceId, userId) => {
  return await Reference.findOne({ _id: referenceId, user: userId })
}

exports.updateReference = async (referenceId, reference) => {
  const mappedReference = referencesMapper.mapReferenceToDatabase(reference)

  return await Reference.findByIdAndUpdate(referenceId, mappedReference, {
    new: true,
  })
}

exports.createManyReferences = async references => {
  return await Reference.create(references)
}

exports.deleteReference = async referenceId => {
  return await Reference.findByIdAndDelete(referenceId)
}
