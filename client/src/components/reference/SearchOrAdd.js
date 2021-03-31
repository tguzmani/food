import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import {
  clearFilterReferences,
  filterReferences,
} from '../../state/reference/referenceActions'
import NewReferenceDialog from './NewReferenceDialog'

const SearchOrAdd = ({
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
  }, [input])

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label='Search or add reference'
            value={input}
            onChange={onChangeInput}
            // onKeyDown={handleOnKeyDown}
          />
        </CardContent>
        {filtering && filteredReferences.length === 0 && (
          <CardActions>
            <NewReferenceDialog referenceName={input} />
            {/* <Button
              size='small'
              color='primary'
              onClick={() => console.log(input)}
            >
              Add {input}
            </Button> */}
          </CardActions>
        )}
      </Card>
    </Box>
  )
}

const mapActionsToProps = { clearFilterReferences, filterReferences }

const mapStateToProps = state => ({
  filtering: state.reference.filtering,
  filteredReferences: state.reference.filteredReferences,
})

export default connect(mapStateToProps, mapActionsToProps)(SearchOrAdd)
