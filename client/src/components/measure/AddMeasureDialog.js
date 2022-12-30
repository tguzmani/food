import React from 'react'
import FAB from '../layout/FAB'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import {
  getAlcoholUnits,
  getTotalCalories,
  getCleanliness,
} from 'util/food'

import AddIcon from '@mui/icons-material/Add'
import useDialog from 'hooks/useDialog'

import dayjs from 'dayjs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead';

var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

const AddMeasureDialog = () => {
  const { foods } = useStoreState(state => state.foods)
  const { measurements } = useStoreState(state => state.measurements)

  const { readFoods, deleteAllFoodsFromDay } = useStoreActions(state => state.foods)
  const { updateMeasurement, createMeasurement } = useStoreActions(
    actions => actions.measurements
  )

  useConditionalRead([{name: readFoods, value: foods.length === 0}])

  const [open, handleOpen, handleClose] = useDialog()

  const lastMeasure = measurements[0]

  const [measure, setMeasure] = React.useState({
    weight: '',
    fat: '',
    sleep: '',
  })

  const onChange = e => {
    setMeasure({ ...measure, [e.target.name]: e.target.value })
  }

  const { weight, fat, sleep } = measure

  const handleAddMeasure = () => {
    // 1/3 -- update last measure
    if (lastMeasure) {
      const measure = {
        _id: lastMeasure._id,
        calories: getTotalCalories(foods),
        cleanliness: getCleanliness(foods),
        alcohol: getAlcoholUnits(foods),
      }

      updateMeasurement(measure)
    }

    // 2/3 -- create measure
    createMeasurement({ weight, fat, sleep })

    // 3/3 -- delete all food
    deleteAllFoodsFromDay()

    handleClose()
  }

  const lastMeasureIsFromToday =
    lastMeasure && !dayjs(lastMeasure.createdAt).isToday()

  return (
    <>
      <FAB
        Icon={AddIcon}
        show={lastMeasureIsFromToday || measurements.length === 0}
        onClick={handleOpen}
        tooltipTitle='Weight In!'
      />

      <Dialog maxWidth='xs' open={open} onClose={handleClose}>
        <DialogTitle>Add Measure</DialogTitle>

        <DialogContent>
          <TextField
            sx={{ marginBottom: '1rem' }}
            fullWidth
            name='weight'
            value={weight}
            onChange={onChange}
            type='number'
            label='Weight'
          ></TextField>

          <TextField
            sx={{ marginBottom: '1rem' }}
            fullWidth
            name='fat'
            value={fat}
            onChange={onChange}
            type='number'
            label='Fat %'
          ></TextField>

          <TextField
            sx={{ marginBottom: '1rem' }}
            fullWidth
            name='sleep'
            value={sleep}
            onChange={onChange}
            type='number'
            label='Sleep'
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleAddMeasure}
            color='primary'
            disabled={weight === ''}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddMeasureDialog
