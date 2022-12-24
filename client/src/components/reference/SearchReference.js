import { Box, TextField } from '@mui/material'
import { connect } from 'react-redux'
import React from 'react'
import {
  clearFilterReferences,
  filterReferences,
} from '../../state/reference/referenceActions'
import NewReferenceDialog from './NewReferenceDialog'
import { useStoreState, useStoreActions } from 'easy-peasy'

const SearchReference = ({
}) => {
  const { filterReferencesQuery } = useStoreState(state => state.references)

  const { setFilterReferencesQuery } = useStoreActions(
    actions => actions.references
  )

  const onChangeInput = e => {
    setFilterReferencesQuery(e.target.value)
  }

  return (
    <>
      <Box mt={3}>
        <TextField
          fullWidth
          label='Search Reference'
          value={filterReferencesQuery}
          onChange={onChangeInput}
          variant='outlined'
        />
      </Box>
      <NewReferenceDialog referenceName={filterReferencesQuery} />
    </>
  )
}

export default SearchReference
