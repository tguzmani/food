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
  Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { createReference } from './../../state/reference/referenceActions'
import ReferenceItem from './ReferenceItem'

const NewReferenceDialog = ({ referenceName, createReference }) => {
  const [open, setOpen] = React.useState(false)

  const [reference, setReference] = React.useState({
    name: referenceName,
    protein: 0,
    carbs: 0,
    fat: 0,
    portion: 0,
    isDirty: false,
    isAlcohol: false,
  })

  const onChange = e => {
    setReference({ ...reference, [e.target.name]: e.target.value })
  }

  const onChangeSwitch = e => {
    setReference({ ...reference, [e.target.name]: !reference[e.target.name] })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = () => {
    createReference(computedReference)
    handleClose()
  }

  const { name, protein, carbs, fat, portion, isDirty, isAlcohol } = reference

  const computedReference = {
    ...reference,
    protein: protein / portion,
    carbs: carbs / portion,
    fat: fat / portion,
  }

  return (
    <>
      <Button color='primary' onClick={handleClickOpen}>
        Add {referenceName}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Reference</DialogTitle>
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
            label='Portion Size'
            type='number'
            name='portion'
            value={portion}
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

          <Typography variant='body1'>Preview</Typography>
          <ReferenceItem reference={computedReference} preview />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            color='primary'
            disabled={portion == 0 || name === ''}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const mapActionsToProps = { createReference }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(NewReferenceDialog)
