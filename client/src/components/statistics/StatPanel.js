import { Box, Button, MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import { capitalize } from '../../util'
import useMenu from './../../hooks/useMenu'
import Menu from './../layout/Menu'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import { useDispatch, useSelector } from 'react-redux'
import { readMeasuresByQuery } from './../../state/measure/measureActions'
import Plot from './Plot'

const StatPanel = () => {
  const measuresByQuery = useSelector(state => state.measure.measuresByQuery)
  const dispatch = useDispatch()

  const properties = [
    'weight',
    'sleep',
    'fat',
    'cleanliness',
    'macros',
    'alcohol',
  ]

  const [property, setProperty] = React.useState(properties[0])
  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()
  const [fromDate, setFromDate] = React.useState(new Date())
  const [toDate, setToDate] = React.useState(new Date())

  const handleFromDateChange = date => {
    setFromDate(date)
  }

  const handleToDateChange = date => {
    setToDate(date)
  }

  const handleSetProperty = e => {
    setProperty(e.target.dataset.property)
    handleCloseMenu()
  }

  const handleSendQuery = () => {
    dispatch(readMeasuresByQuery({ from: fromDate, to: toDate }))
  }

  return (
    <>
      {/* <Typography variant='body1'>Property</Typography> */}

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box>
          <KeyboardDatePicker
            margin='normal'
            label='From'
            format='dd/MM/yyyy'
            maxDate={new Date()}
            inputVariant='outlined'
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </Box>

        <Box mb={2}>
          <KeyboardDatePicker
            margin='normal'
            minDate={fromDate}
            maxDate={new Date()}
            inputVariant='outlined'
            label='To'
            format='dd/MM/yyyy'
            value={toDate}
            onChange={handleToDateChange}
          />
        </Box>
      </MuiPickersUtilsProvider>

      <Button onClick={handleOpenMenu}>{capitalize(property)}</Button>

      <Menu anchorEl={anchorEl}>
        {properties.map(property => (
          <MenuItem
            key={property}
            data-property={property}
            onClick={handleSetProperty}
          >
            {capitalize(property)}
          </MenuItem>
        ))}
      </Menu>

      <Button onClick={handleSendQuery}>Send Query</Button>

      {measuresByQuery.length > 0 && (
        <Plot data={measuresByQuery} property={property} />
      )}
    </>
  )
}

export default StatPanel
