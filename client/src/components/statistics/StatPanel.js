import React, { useMemo, useState } from 'react'
import { Box, Button, MenuItem, Grid, FormControl, Stack } from '@mui/material'
import { capitalize, mean } from '../../util'

import { Unstable_MobileNextDatePicker as MobileNextDatePicker } from '@mui/x-date-pickers/MobileNextDatePicker'
import { Unstable_DesktopNextDatePicker as DesktopNextDatePicker } from '@mui/x-date-pickers'

import dayjs from 'dayjs'
import PropertyPlot from './PropertyPlot'
import StatisticsTable from './StatisticsTable'
import BackdropLoading from './../layout/BackdropLoading'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useResponsive from 'hooks/useResponsive'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Plot from './Plot'

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

  const weekByNumber = number => dayjs(fromDate).add(number, 'week')

  const weeksBetween = dayjs(toDate).diff(dayjs(fromDate), 'week')

  let measuresByWeek = []

  for (let i = 0; i < weeksBetween; i++) {
    measuresByWeek.push(
      measurementsByQuery.filter(measure => {
        return dayjs(measure.createdAt).isBetween(
          weekByNumber(i),
          weekByNumber(i + 1)
        )
      })
    )
  }

  const propertiesByWeek = measuresByWeek.map(measures =>
    measures.map(measure => measure[property])
  )

  const propertiesMeansByWeek = useMemo(
    () =>
      propertiesByWeek
        .map(propertyByWeek => mean(propertyByWeek))
        .map((mean, index) => ({
          createdAt: weekByNumber(index),
          value: mean,
        })),
    [measurementsByQuery, property]
  )

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

  const weekPlotTitle = `Average ${property} per week`

  return (
    <>
      <BackdropLoading open={loading} />

      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={4}>
            <DatePicker
              sx={{ width: 1 }}
              label='From'
              maxDate={dayjs()}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={4}>
            <DatePicker
              sx={{ width: 1 }}
              minDate={fromDate}
              maxDate={dayjs()}
              label='To'
              value={toDate}
              onChange={handleToDateChange}
            />
          </Grid>

          <Grid item xs={12} sm={2} md={4}>
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
          <Grid container>
            <Grid
              item
              xs={12}
              lg={weeksBetween > 1 ? 6 : 12}
              sx={{ pr: isMobile ? 0 : 1 }}
            >
              <Stack spacing={2}>
                <PropertyPlot data={measurementsByQuery} property={property} />
                <StatisticsTable
                  data={measurementsByQuery}
                  property={property}
                />
              </Stack>
            </Grid>

            {weeksBetween > 1 && (
              <Grid item xs={12} lg={6} sx={{ pl: isMobile ? 0 : 1, mt: isMobile ? 2 : 0 }}>
                <Plot data={propertiesMeansByWeek} title={weekPlotTitle} />
              </Grid>
            )}
          </Grid>
        )}
      </Stack>
    </>
  )
}

export default StatPanel
