import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Switch,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateReference } from './../../state/reference/referenceActions'

const UpdateReferenceDialog = ({
  initalReference,
  open,
  setOpen,
  updateReference,
}) => {
  const [reference, setReference] = React.useState(initalReference)

  const onChange = e => {
    setReference({ ...reference, [e.target.name]: e.target.value })
  }

  const onChangeSwitch = e => {
    setReference({ ...reference, [e.target.name]: !reference[e.target.name] })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = () => {
    updateReference(reference)
    handleClose()
  }

  const { name, protein, carbs, fat, portion, isDirty, isAlcohol } = reference

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Reference</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Name'
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='dense'
          label='Protein'
          type='number'
          name='protein'
          value={protein}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='dense'
          label='Carbs'
          type='number'
          name='carbs'
          value={carbs}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='dense'
          label='Fat'
          type='number'
          name='fat'
          value={fat}
          onChange={onChange}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={isDirty}
              onChange={onChangeSwitch}
              name='isDirty'
              color='primary'
            />
          }
          label='Dirty'
        />

        <FormControlLabel
          control={
            <Switch
              checked={isAlcohol}
              onChange={onChangeSwitch}
              name='isAlcohol'
              color='primary'
            />
          }
          label='Alcohol'
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          color='primary'
          disabled={portion == 0 || name === ''}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapActionsToProps = { updateReference }

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UpdateReferenceDialog)
