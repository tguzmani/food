const referencesRepository = require('./references.mongo.repository')
const Food = require('../models/Food')

const referenceExists = async (name, userId) => {
  const reference = await referencesRepository.readReferenceByName(name, userId)

  return Boolean(reference)
}

exports.createReference = async (reference, userId) => {
  if (await referenceExists(reference.name, userId))
    throw new Error(`Reference '${reference.name}' already exists`)

  return await referencesRepository.createReference(reference, userId)
}

exports.copyReferencesToUser = async (sourceUserId, destityUserId) => {
  const sourceReferences = await exports.readReferencesByUserId(sourceUserId)

  const destinyReferences = sourceReferences.map(reference => ({
    ...reference._doc,
    _id: undefined,
    user: destityUserId,
  }))

  return await referencesRepository.createManyReferences(destinyReferences)
}

const readReferenceById = async referenceId => {
  return await referencesRepository.readReferenceById(referenceId)
}

const readReferenceByName = async (name, userId) => {
  return await referencesRepository.readReferenceByName(name, userId)
}

exports.readReferencesByUserId = async userId => {
  return await referencesRepository.readReferencesByUserId(userId)
}

exports.updateReference = async (referenceId, reference) => {
  return await referencesRepository.updateReference(referenceId, reference)
}

exports.deleteReference = async (referenceId, userId) => {
  const reference = await referencesRepository.readReferenceByUserId(
    referenceId,
    userId
  )

  if (!reference) throw new Error('Reference not found')

  const foods = await Food.find({ reference: referenceId })

  if (foods.length > 0)
    throw new Error(
      'There are foods using this reference. Remove them first and try again'
    )

  return await referencesRepository.deleteReference(referenceId)
}
