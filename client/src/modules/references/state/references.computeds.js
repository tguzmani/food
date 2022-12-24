import { computed } from 'easy-peasy'

const referencesComputeds = {
  mealsReferences: computed(state =>
    state.references.filter(reference => reference.meal !== 0)
  ),

  previewMealReferences: computed(state =>
    state.references.filter(reference => reference.meal === 0)
  ),
}

export default referencesComputeds
