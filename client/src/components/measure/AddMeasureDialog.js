import React, { useEffect } from 'react'
import FAB from '../layout/FAB'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'

import {
  getAlcoholUnits,
  getTotalCalories,
  getCleanliness,
} from './../../util/food'

import AddIcon from '@material-ui/icons/Add'
import useDialog from '../../hooks/useDialog'
import useFoods from './../../hooks/useFoods'

import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFoods, readFoods } from './../../state/food/foodActions'

import {
  updateMeasure,
  createMeasure,
} from './../../state/measure/measureActions'

import dayjs from 'dayjs'
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

const AddMeasureDialog = () => {
  const [open, handleOpen, handleClose] = useDialog()
  const foods = useFoods('meals')
  const measures = useSelector(state => state.measure.measures)
  const lastMeasure = measures[0]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readFoods())
  }, [])

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

      dispatch(updateMeasure(measure))
    }

    // 2/3 -- create measure
    dispatch(createMeasure({ weight, fat, sleep }))

    // 3/3 -- delete all food
    dispatch(deleteAllFoods())

    handleClose()
  }

  return (
    <>
      <FAB
        Icon={AddIcon}
        show={
          (lastMeasure && !dayjs(lastMeasure.createdAt).isToday()) ||
          measures.length === 0
        }
        onClick={handleOpen}
        tooltipTitle='Weight In!'
      />

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Measure</DialogTitle>

        <DialogContent>
          <TextField
            style={{ marginBottom: '1rem' }}
            fullWidth
            name='weight'
            value={weight}
            onChange={onChange}
            type='text'
            label='Weight'
          ></TextField>

          <TextField
            style={{ marginBottom: '1rem' }}
            fullWidth
            name='fat'
            value={fat}
            onChange={onChange}
            type='number'
            label='Fat %'
          ></TextField>

          <TextField
            style={{ marginBottom: '1rem' }}
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
            disableElevation
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
