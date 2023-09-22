import React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import Measurements from './../measure/Measurements'
import AddMeasureDialog from '../measure/AddMeasureDialog'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import Loading from 'components/layout/Loading'
import NoMeasurements from 'components/measure/NoMeasurements'
import Page from 'components/layout/Page'
import { useTranslation } from 'react-i18next'

const MeasurementsPage = () => {
  const theme = useTheme()
  const { readMeasurements } = useStoreActions(actions => actions.measurements)
  const { measurements, loading } = useStoreState(state => state.measurements)

  const { t } = useTranslation()

  useConditionalRead([
    {
      name: readMeasurements,
      condition: measurements.length === 0,
    },
  ])

  if (measurements.length === 0 && loading) return <Loading />

  return (
    <Page pathname='/measurements'>
      <Box>
        {measurements.length === 0 && !loading ? (
          <NoMeasurements />
        ) : (
          <Grid container display='flex' spacing={3}>
            <Grid item xs={12} lg={6}>
              <Typography variant='h1'  gutterBottom>
                {t('measurements.thisBlock')}
              </Typography>

              <Measurements measurements={measurements} current />
            </Grid>

              <Grid item xs={12} lg={6}>
                
              <Typography variant='h1'  gutterBottom>
              {t('measurements.lastBlock')}
              </Typography>

              <Measurements measurements={measurements} />
            </Grid>
          </Grid>
        )}

        <AddMeasureDialog />
        <Box sx={{ ...theme.mixins.toolbar }} />
      </Box>
    </Page>
  )
}

export default MeasurementsPage
