import { Box, TextField } from '@mui/material'
import { connect } from 'react-redux'
import React from 'react'
import {
  clearFilterReferences,
  filterReferences,
} from '../../state/reference/referenceActions'
import NewReferenceDialog from './NewReferenceDialog'

const SearchReference = ({
  clearFilterReferences,
  filterReferences,
  filtering,
  filteredReferences,
}) => {
  const [input, setInput] = React.useState('')

  const onChangeInput = e => {
    setInput(e.target.value)
  }

  React.useEffect(() => {
    if (input === '') clearFilterReferences()
    else filterReferences(input)
    // eslint-disable-next-line
  }, [input])

  return (
    <>
      <Box mt={3}>
        <TextField
          fullWidth
          label='Search Reference'
          value={input}
          onChange={onChangeInput}
          variant='outlined'
          className='bg-white'
        />
      </Box>
      <NewReferenceDialog referenceName={input} />
    </>
  )
}

const mapActionsToProps = { clearFilterReferences, filterReferences }

const mapStateToProps = state => ({
  filtering: state.reference.filtering,
  filteredReferences: state.reference.filteredReferences,
})

export default connect(mapStateToProps, mapActionsToProps)(SearchReference)
