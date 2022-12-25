import React from 'react'
import { Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Measures from './../measure/Measures'
import AddMeasureDialog from '../measure/AddMeasureDialog'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'

const useStyles = makeStyles(theme => ({
  fabFix: theme.mixins.toolbar,
}))

const MeasuresPage = ({ loading }) => {
  const classes = useStyles()

  const { readMeasurements } = useStoreActions(actions => actions.measurements)
  const { measurements: measures } = useStoreState(state => state.measurements)

  useConditionalRead({ name: readMeasurements, condition: measures.length === 0 })

  if (measures.length === 0 && loading) return <div>Loading...</div>

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
      <div className={classes.fabFix} />
    </>
  )
}

export default MeasuresPage
