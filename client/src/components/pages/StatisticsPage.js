import React, { useEffect } from 'react'
import StatPanel from './../statistics/StatPanel'
import { Grid } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import NoMeasurementsStats from '../measure/NoMeasurementsStats'

const StatisticsPage = () => {
  const panelIds = [1]

  const { measurements, loading } = useStoreState(state => state.measurements)

  const { clearMeasurementsByQuery } = useStoreActions(
    actions => actions.measurements
  )

  useEffect(() => {
    clearMeasurementsByQuery()
  }, [])

  if (measurements.length === 0 && !loading) return <NoMeasurementsStats />

  return (
    <Grid container spacing={2}>
      {panelIds.map(panel => (
        <Grid item xs data-id={panel} key={panel}>
          <StatPanel />
        </Grid>
      ))}
    </Grid>
  )
}

export default StatisticsPage
