import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import CanvasJSReact from '../../lib/canvasjs.react'
import { capitalize } from '../../util/index'

import { red, green, blue } from '@mui/material/colors'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const Plot = ({ data, property }) => {
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

  if (property === 'macros') {
    dataPoints = {
      protein: data.map(element => ({
        x: new Date(element.createdAt),
        y: element.macros.protein,
      })),

      carbs: data.map(element => ({
        x: new Date(element.createdAt),
        y: element.macros.carbs,
      })),

      fat: data.map(element => ({
        x: new Date(element.createdAt),
        y: element.macros.fat,
      })),
    }

    chartData = [
      {
        color: red[700],
        type: 'spline',
        toolTipContent: '{y}',
        dataPoints: dataPoints.protein,
        connectNullData: true,
        yValueFormatString: '#0.##',
        name: 'Protein',
      },

      {
        color: blue[700],
        type: 'spline',
        toolTipContent: '{y}',
        dataPoints: dataPoints.carbs,
        connectNullData: true,
        yValueFormatString: '#0.##',
        name: 'Carbs',
      },

      {
        color: green[700],
        type: 'spline',
        toolTipContent: '{y}',
        dataPoints: dataPoints.fat,
        connectNullData: true,
        yValueFormatString: '#0.##',
        name: 'Fat',
      },
    ]
  }

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
    <Box my={3}>
      <Paper>
        <Box p={4}>
          <CanvasJSChart options={options} />
        </Box>
      </Paper>
    </Box>
  )
}

export default Plot
