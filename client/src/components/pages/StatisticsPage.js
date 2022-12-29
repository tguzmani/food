import React, { useEffect } from 'react'
import StatPanel from './../statistics/StatPanel'
import { Grid } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const StatisticsPage = () => {
  const panelIds = [1]

  const { clearMeasurementsByQuery } = useStoreActions(
    actions => actions.measurements
  )

  useEffect(() => {
    clearMeasurementsByQuery()
  })

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
