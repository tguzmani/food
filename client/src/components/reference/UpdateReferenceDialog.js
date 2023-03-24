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
} from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const UpdateReferenceDialog = ({ initalReference, open, setOpen }) => {
  const [reference, setReference] = React.useState(initalReference)

  const { updateReference } = useStoreActions(actions => actions.references)

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
    <Dialog open={open} onClose={handleClose} maxWidth='xs'>
      <DialogTitle>Update Reference</DialogTitle>
      <DialogContent>
        <TextField
          margin='normal'
          label='Name'
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='normal'
          label='Protein'
          type='number'
          name='protein'
          value={protein}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='normal'
          label='Carbs'
          type='number'
          name='carbs'
          value={carbs}
          onChange={onChange}
          fullWidth
        />

        <TextField
          margin='normal'
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
          variant='contained'
          onClick={handleUpdate}
          color='primary'
          disabled={Number(portion) === 0 || name === ''}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateReferenceDialog
