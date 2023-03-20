import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import CanvasJSReact from '../../lib/canvasjs.react'
import { capitalize } from '../../util/index'

import useIsDarkMode from 'hooks/useIsDarkMode'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const PropertyPlot = ({ data, property }) => {
  // console.log({ data, property })
  const theme = useTheme()
  const isDarkMode = useIsDarkMode()

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
    theme: isDarkMode ? 'dark2' : 'light2',
    title: {
      text: capitalize(property),
      fontFamily: 'Poppins',
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
      <Box p={3.5}>
        <CanvasJSChart options={options} />
      </Box>
    </Paper>
  )
}

export default PropertyPlot
