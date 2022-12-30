import React from 'react'
import dayjs from 'dayjs'
import PropertyPlot from '../statistics/PropertyPlot'
import StatisticsTable from '../statistics/StatisticsTable'
import MeasureList from './MeasurementList'
import { Stack, Typography } from '@mui/material'

const Measurements = ({ measurements, current }) => {
  let thisMeasurements = []

  if (current && dayjs().get('date') > 15) {
    // console.log('current && > 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month').add(15, 'day') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month')
    )
  }

  if (current && dayjs().get('date') <= 15) {
    // console.log('current && <= 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month').subtract(15, 'day')
    )
  }

  if (!current && dayjs().get('date') > 15) {
    // console.log('last && > 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().startOf('month').add(15, 'day')
    )
  }

  if (!current && dayjs().get('date') <= 15) {
    // console.log('last && <= 15')
    // console.log('end', dayjs().subtract(1, 'month').endOf('month'))

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().subtract(1, 'month').startOf('month').add(15, 'day') <
          dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().subtract(1, 'month').endOf('month')
    )
  }

  return thisMeasurements.length === 0 ? (
    <Typography variant='body1'>No measurements available</Typography>
  ) : (
    <Stack spacing={2}>
      <PropertyPlot data={thisMeasurements} property='weight' />
      <StatisticsTable data={thisMeasurements} property='weight' />
      <MeasureList measurements={thisMeasurements} />
    </Stack>
  )
}

export default Measurements
