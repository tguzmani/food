import React from 'react'
import { connect } from 'react-redux'
import SearchOrAdd from '../reference/SearchOrAdd'
import References from '../reference/References'
import { readReferences } from '../../state/reference/referenceActions'

const ReferencesPage = ({
  readReferences,
  references,
  loading,
  filtering,
  filteredReferences,
}) => {
  React.useEffect(() => {
    if (references.length === 0) readReferences()
  }, [])

  if (references.length === 0 && loading) return <div>Loading...</div>

  return (
    <div>
      <SearchOrAdd />
      <References references={filtering ? filteredReferences : references} />
    </div>
  )
}

const mapActionsToProps = { readReferences }

const mapStateToProps = state => ({
  references: state.reference.references,
  filteredReferences: state.reference.filteredReferences,
  filtering: state.reference.filtering,
  loading: state.reference.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(ReferencesPage)
