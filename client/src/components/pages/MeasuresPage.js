import React from 'react'
import { Box, Grid, useTheme} from '@mui/material'
import Measures from './../measure/Measures'
import AddMeasureDialog from '../measure/AddMeasureDialog'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import Loading from 'components/layout/Loading'

const MeasuresPage = () => {
  const theme = useTheme()
  const { readMeasurements } = useStoreActions(actions => actions.measurements)
  const { measurements: measures, loading } = useStoreState(state => state.measurements)

  useConditionalRead({ name: readMeasurements, condition: measures.length === 0 })

  if (measures.length === 0 && loading) return <Loading />

  return (
    <>
      <Grid container display='flex' spacing={3}>
        <Grid item xs={12} lg={6}>
          <Measures measures={measures} current />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Measures measures={measures} />
        </Grid>
      </Grid>

      <AddMeasureDialog />
      <Box sx={{...theme.mixins.toolbar}} />
    </>
  )
}

export default MeasuresPage
