import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import CanvasJSReact from '../../lib/canvasjs.react'
import { capitalize } from '../../util/index'

import { red, green, blue } from '@mui/material/colors'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const PropertyPlot = ({ data, property }) => {
  // console.log({ data, property })
  const theme = useTheme()

  let dataPoints = data.map(element => ({
    x: new Date(element.createdAt),
    y: element[property],
  }))

  let chartData = [
    {
      color: theme.palette.primary.main,
      type: 'spline',
      name: capitalize(property),
      connectNullData: true,
      yValueFormatString: '#0.##',
      dataPoints,
    },
  ]

  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: capitalize(property),
      fontFamily: 'Lato',
      fontSize: 16,
    },

    axisY: {
      includeZero: false,
    },

    toolTip: {
      shared: true,
    },

    axisX: {
      valueFormatString: 'DD MMM, YY',
    },

    data: chartData,
  }

  return (
      <Paper>
        <Box p={4}>
          <CanvasJSChart options={options} />
        </Box>
      </Paper>
  )
}

export default PropertyPlot
