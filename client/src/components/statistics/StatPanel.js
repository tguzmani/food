import { Box, Button, MenuItem } from '@mui/material'
import React from 'react'
import { capitalize } from '../../util'
import useMenu from './../../hooks/useMenu'
import Menu from './../layout/Menu'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import Plot from './Plot'
import StatisticsTable from './StatisticsTable'
import BackdropLoading from './../layout/BackdropLoading'
import { useStoreActions, useStoreState } from 'easy-peasy'

const StatPanel = () => {
  const { loading, measurementsByQuery } = useStoreState(state => state.measurements)

  const { readMeasurementsByDate } = useStoreActions(
    actions => actions.measurements
  )

  const properties = [
    'weight',
    'sleep',
    'fat',
    'calories',
    'cleanliness',
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
    readMeasurementsByDate({ from: fromDate, to: toDate })
  }

  return (
    <>
      <BackdropLoading open={loading} />

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

      {measurementsByQuery.length > 0 && (
        <>
          <StatisticsTable data={measurementsByQuery} property={property} />
          <Plot data={measurementsByQuery} property={property} />
        </>
      )}
    </>
  )
}

export default StatPanel
