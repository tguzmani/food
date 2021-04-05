import { Box, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui'

import dayjs from 'dayjs'

const useStyles = makeStyles(theme => ({
  chart: {
    padding: theme.spacing(4),
    height: 100,
  },
}))

const Plot = ({ measures }) => {
  const classes = useStyles()

  const data = measures
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map(measure => ({
      argument: dayjs(measure.createdAt).format('DD-MM'),
      value: measure.weight,
    }))

  console.log(data)

  return (
    <Box my={3}>
      <Paper>
        <Chart data={data} className={classes.chart} height={300}>
          <ArgumentAxis />
          <ValueAxis />
          <LineSeries valueField='value' argumentField='argument' />
        </Chart>
      </Paper>
    </Box>
  )
}

export default Plot
