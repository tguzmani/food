import React, { useEffect } from 'react'
import StatPanel from './../statistics/StatPanel'
import { Grid } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import NoMeasurementsStats from '../measure/NoMeasurementsStats'
import useConditionalRead from 'hooks/useConditionalRead'
import Page from 'components/layout/Page'

const StatisticsPage = () => {
  const panelIds = [1]

  const { measurements, loading } = useStoreState(state => state.measurements)

  const { readMeasurements, clearMeasurementsByQuery } = useStoreActions(
    actions => actions.measurements
  )

  useConditionalRead([
    { name: readMeasurements, condition: measurements.length === 0 },
  ])

  useEffect(() => {
    clearMeasurementsByQuery()
    // eslint-disable-next-line
  }, [])

  if (measurements.length === 0 && !loading) return <NoMeasurementsStats />

  return (
    <Page pathname='/statistics'>
      <Grid container spacing={2}>
        {panelIds.map(panel => (
          <Grid item xs data-id={panel} key={panel}>
            <StatPanel />
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}

export default StatisticsPage
