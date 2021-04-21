import { Box, Paper } from '@material-ui/core'
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const Plot = ({ measures }) => {
  return (
    <Box my={3}>
      <Paper>
        <LineChart
          width={600}
          height={300}
          data={measures}
          margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
        >
          <Line type='monotone' dataKey='weight' stroke='#8884d8' />
          {/* <CartesianGrid stroke='#ccc' strokeDasharray='5 5' /> */}
          <XAxis dataKey='createdAt' />
          <YAxis type='number' domain={['dataMin', 'dataMax']} />
          <Tooltip />
        </LineChart>
      </Paper>
    </Box>
  )
}

export default Plot
