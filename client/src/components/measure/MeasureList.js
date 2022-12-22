import { Box, Card, CardContent, List } from '@mui/material'
import React from 'react'
import MeasureItem from './MeasureItem'
import { sortByDate } from './../../util/measure'

const Measures = ({ measures, half }) => {
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <List>
            {sortByDate(measures, 'dec').map(measure => (
              <MeasureItem key={measure._id} measure={measure} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Measures
