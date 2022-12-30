import React, { useState } from 'react'
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
  Divider,
} from '@mui/material'
import ReferenceItem from './ReferenceItem'
import FAB from '../layout/FAB'
import AddIcon from '@mui/icons-material/Add'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useUser from 'hooks/useUser'

const NewReferenceDialog = () => {
  const [open, setOpen] = React.useState(false)

  const { userIsPremium } = useStoreState(state => state.users)
  const { createReference } = useStoreActions(actions => actions.references)
  const { referenceCount } = useStoreState(state => state.references)

  const [reference, setReference] = useState({
    name: '',
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
    name: reference.name.toLowerCase(),
    protein: protein / portion,
    carbs: carbs / portion,
    fat: fat / portion,
  }

  const cantAddMoreReferences = referenceCount >= 20 && !userIsPremium

  const referenceNameHasSpaces = name.match(/\s+/)

  return (
    <>
      <FAB
        show
        Icon={AddIcon}
        onClick={handleClickOpen}
        tooltipTitle='Add Reference'
        disabled={cantAddMoreReferences}
      />

      <Dialog open={open} onClose={handleClose} maxWidth='xs'>
        <DialogTitle>Add Reference</DialogTitle>
        <DialogContent>
          <TextField
            error={referenceNameHasSpaces}
            helperText={referenceNameHasSpaces && 'Name cannot contain spaces'}
            autoFocus
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
            label='Portion Size'
            type='number'
            name='portion'
            value={portion}
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

          <Divider sx={{ my: 2 }} />

          <Typography variant='body1' gutterBottom>
            Preview
          </Typography>
          <ReferenceItem reference={computedReference} preview />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleCreate}
            color='primary'
            disabled={portion === 0 || name === '' || referenceNameHasSpaces}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewReferenceDialog
