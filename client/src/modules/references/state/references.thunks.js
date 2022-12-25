import { thunk } from 'easy-peasy'
import ReferencesRepository from './references.repository'

const referencesRepository = new ReferencesRepository()

const referencesThunks = {
  createReference: thunk(async (actions, reference, { fail }) => {
    try {
      const createdReference = await referencesRepository.createReference(
        reference
      )
      actions.appendReference(createdReference)
    } catch (error) {
      fail(error)
    }
  }),

  readReferences: thunk(async (actions, _, { fail }) => {
    try {
      const references = await referencesRepository.readReferences()
      actions.setReferences(references)
    } catch (error) {
      fail(error)
    }
  }),

  updateReference: thunk(async (actions, reference, { fail }) => {
    try {
      const updatedReference = await referencesRepository.updateReference(
        reference
      )
      actions.replaceReference(updatedReference)
    } catch (error) {
      fail(error)
    }
  }),

  deleteReference: thunk(async (actions, reference, { fail }) => {
    try {
      const removedReference = await referencesRepository.deleteReference(
        reference
      )
      actions.filterReferences(removedReference)
    } catch (error) {
      fail(error)
    }
  }),
}

export const referencesThunksNames = Object.keys(referencesThunks).map(
  key => key
)

export default referencesThunks
