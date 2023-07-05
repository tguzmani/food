import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'

import { useStoreActions } from 'easy-peasy'
import useForm from 'hooks/useForm'
import useUser from 'hooks/useUser'
import { useTranslation } from 'react-i18next'

const UpdateMeasureDialog = ({ initialMeasure, open, handleClose }) => {
  const user = useUser()

  const [errors, setError] = useState({
    weight: false,
    fat: false,
    sleep: false,
  })

  const { updateMeasurement } = useStoreActions(actions => actions.measurements)

  const { t } = useTranslation()

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
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>{t('dialog.updateMeasurement')}</DialogTitle>

        <DialogContent>
          <TextField
            error={errors.weight}
            helperText={errors.weight && t('error.invalidWeight')}
            margin="normal"
            fullWidth
            label={t('measurements.weight')}
            InputProps={{
              endAdornment: <InputAdornment position="end">{user?.units}</InputAdornment>,
            }}
            {...bindMeasure('weight')}
          ></TextField>

          <TextField
            error={errors.fat}
            helperText={errors.fat && t('error.invalidFatPercentage')}
            margin="normal"
            fullWidth
            label={t('measurements.fatPer')}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            {...bindMeasure('fat')}
          ></TextField>

          <TextField
            error={errors.sleep}
            helperText={errors.sleep && t('error.invalidSleepHours')}
            margin="normal"
            fullWidth
            label={t('measurements.sleep')}
            InputProps={{
              endAdornment: <InputAdornment position="end">h</InputAdornment>,
            }}
            {...bindMeasure('sleep')}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('actions.cancel')}
          </Button>
          <Button variant="contained" onClick={handleUpdateMeasure} color="primary" disabled={measure.weight === ''}>
            {t('actions.update')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateMeasureDialog
