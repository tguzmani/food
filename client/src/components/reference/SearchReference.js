import { Box, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'

const SearchReference = () => {
  const { filterReferencesQuery } = useStoreState(state => state.references)

  const { setFilterReferencesQuery } = useStoreActions(actions => actions.references)

  const onChangeInput = e => {
    setFilterReferencesQuery(e.target.value)
  }

  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <TextField
          fullWidth
          label={t('references.searchReference')}
          value={filterReferencesQuery}
          onChange={onChangeInput}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  )
}

export default SearchReference
