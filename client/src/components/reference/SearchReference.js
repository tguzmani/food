import { Box, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import NewReferenceDialog from './NewReferenceDialog'
import { useStoreState, useStoreActions } from 'easy-peasy'
import SearchIcon from '@mui/icons-material/Search'

const SearchReference = () => {
  const { filterReferencesQuery } = useStoreState(state => state.references)

  const { setFilterReferencesQuery } = useStoreActions(
    actions => actions.references
  )

  const onChangeInput = e => {
    setFilterReferencesQuery(e.target.value)
  }

  return (
    <>
      <Box mt={3} sx={{ textAlign: 'center' }}>
        <TextField
          fullWidth
          label='Search Reference'
          value={filterReferencesQuery}
          onChange={onChangeInput}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <NewReferenceDialog referenceName={filterReferencesQuery} />
    </>
  )
}

export default SearchReference
