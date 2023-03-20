import { Box, Paper, useTheme } from '@mui/material'
import CanvasJSReact from '../../lib/canvasjs.react'
import React from 'react'
import useIsDarkMode from 'hooks/useIsDarkMode'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const Plot = ({ data, title }) => {
  const theme = useTheme()

  let dataPoints = data.map(element => ({
    x: new Date(element.createdAt),
    y: element.value,
  }))

  const isDarkMode = useIsDarkMode()
  
  let chartData = [
    {
      color: theme.palette.primary.main,
      type: 'spline',
      name: title,
      connectNullData: true,
      yValueFormatString: '#0.##',
      dataPoints,
    },
  ]

  const options = {
    animationEnabled: true,
    theme: isDarkMode ? 'dark2' : 'light2',
    title: {
      text: title,
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
      <Box p={4}>
        <CanvasJSChart options={options} />
      </Box>
    </Paper>
  )
}

export default Plot
