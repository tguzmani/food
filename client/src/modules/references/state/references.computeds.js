import { computed } from 'easy-peasy'

const referencesComputeds = {
  filteredReferences: computed(state =>
    state.references.filter(reference => {
      const regex = new RegExp(state.filterReferencesQuery, 'gi')
      return reference.name.match(regex)
    })
  ),

  isFiltering: computed(state => state.filterReferencesQuery.length !== ''),
}

export default referencesComputeds
