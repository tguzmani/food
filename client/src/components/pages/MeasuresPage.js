import React from 'react'
import { connect } from 'react-redux'
import { readMeasures } from '../../state/measure/measureActions'
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Measures from './../measure/Measures'
import AddMeasureDialog from '../measure/AddMeasureDialog'

const useStyles = makeStyles(theme => ({
  fabFix: theme.mixins.toolbar,
}))

const MeasuresPage = ({ readMeasures, measures, loading }) => {
  const classes = useStyles()

  React.useEffect(() => {
    if (measures.length === 0) readMeasures()
    // eslint-disable-next-line
  }, [])

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

const mapActionsToProps = { readMeasures }

const mapStateToProps = state => ({
  measures: state.measure.measures,
  loading: state.measure.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(MeasuresPage)
