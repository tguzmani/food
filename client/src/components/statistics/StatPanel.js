import { Box, Button, MenuItem, Grid, FormControl, Stack } from '@mui/material'
import React from 'react'
import { capitalize } from '../../util'
import useMenu from 'hooks/useMenu'
import Menu from './../layout/Menu'

import { Unstable_MobileNextDatePicker as MobileNextDatePicker } from '@mui/x-date-pickers/MobileNextDatePicker'
import { Unstable_DesktopNextDatePicker as DesktopNextDatePicker } from '@mui/x-date-pickers'

import dayjs from 'dayjs'
import Plot from './Plot'
import StatisticsTable from './StatisticsTable'
import BackdropLoading from './../layout/BackdropLoading'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useResponsive from 'hooks/useResponsive'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

const StatPanel = () => {
  const isMobile = useResponsive('sm')
  const { loading, measurementsByQuery } = useStoreState(
    state => state.measurements
  )

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
  const [fromDate, setFromDate] = React.useState(dayjs())
  const [toDate, setToDate] = React.useState(dayjs())

  const handleFromDateChange = date => {
    setFromDate(date)
  }

  const handleToDateChange = date => {
    setToDate(date)
  }

  const handleSetProperty = e => {
    setProperty(e.target.value)
  }

  const handleSendQuery = () => {
    readMeasurementsByDate({ from: fromDate, to: toDate })
  }

  const DatePicker = isMobile ? MobileNextDatePicker : DesktopNextDatePicker

  const areDatesEqual = dayjs(fromDate).isSame(dayjs(toDate))

  return (
    <>
      <BackdropLoading open={loading} />

      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <DatePicker
              sx={{ width: 1 }}
              label='From'
              maxDate={dayjs()}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <DatePicker
              sx={{ width: 1 }}
              minDate={fromDate}
              maxDate={dayjs()}
              label='To'
              value={toDate}
              onChange={handleToDateChange}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel id='select-category-label'>Category</InputLabel>
              <Select
                labelId='select-category-label'
                value={property}
                onChange={handleSetProperty}
                label='Category'
              >
                {properties.map(property => (
                  <MenuItem key={property} value={property}>
                    {capitalize(property)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box>
          <Button
            variant='contained'
            onClick={handleSendQuery}
            disabled={areDatesEqual}
            fullWidth={isMobile}
          >
            Send Query
          </Button>
        </Box>

        {measurementsByQuery.length > 0 && (
          <>
            <StatisticsTable data={measurementsByQuery} property={property} />
            <Plot data={measurementsByQuery} property={property} />
          </>
        )}
      </Stack>
    </>
  )
}

export default StatPanel
