import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material'

import { useStoreActions } from 'easy-peasy'
import useForm from 'hooks/useForm'
import useUser from 'hooks/useUser'

const UpdateMeasureDialog = ({ initialMeasure, open, handleClose }) => {
  const user = useUser()

  const [errors, setError] = useState({
    weight: false,
    fat: false,
    sleep: false,
  })

  const { updateMeasurement } = useStoreActions(actions => actions.measurements)

  const [measure, bindMeasure] = useForm({
    weight: initialMeasure.weight,
    fat: initialMeasure.fat,
    sleep: initialMeasure.sleep,
  })

  const handleUpdateMeasure = () => {
    setError({
      weight: !weightPattern.test(measure.weight),
      fat: !fatPattern.test(measure.fat),
      sleep: !sleepPattern.test(measure.sleep),
    })

    const thereIsError = Object.values(errors).some(error => error)

    if (!thereIsError) {
      updateMeasurement({ ...measure, _id: initialMeasure._id })
      handleClose()
    }
  }

  const weightPattern = /^([0-9]{1,3}(\.[0-9]{1,2})?)$/
  const fatPattern = /^([0-9]{1,2}(\.[0-9]{1,2})?)$/
  const sleepPattern = /^([0-9]{1,2}(\.[0-9])?)$/

  return (
    <>
      <Dialog maxWidth='xs' open={open} onClose={handleClose}>
        <DialogTitle>Update Measure</DialogTitle>

        <DialogContent>
          <TextField
            error={errors.weight}
            helperText={errors.weight && 'Invalid weight'}
            margin='normal'
            fullWidth
            label='Weight'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>{user?.units}</InputAdornment>
              ),
            }}
            {...bindMeasure('weight')}
          ></TextField>

          <TextField
            error={errors.fat}
            helperText={errors.fat && 'Invalid fat percentage'}
            margin='normal'
            fullWidth
            label='Fat %'
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
            {...bindMeasure('fat')}
          ></TextField>

          <TextField
            error={errors.sleep}
            helperText={errors.sleep && 'Invalid sleep hours'}
            margin='normal'
            fullWidth
            label='Sleep'
            InputProps={{
              endAdornment: <InputAdornment position='end'>h</InputAdornment>,
            }}
            {...bindMeasure('sleep')}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleUpdateMeasure}
            color='primary'
            disabled={measure.weight === ''}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateMeasureDialog
