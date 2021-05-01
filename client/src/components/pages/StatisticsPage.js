import React from 'react'
import StatPanel from './../statistics/StatPanel'
import { Box, Grid } from '@material-ui/core'

const StatisticsPage = () => {
  const panelIds = [1]

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
