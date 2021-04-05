import { Box, Card, CardContent, List } from '@material-ui/core'
import React from 'react'
import MeasureItem from './MeasureItem'

const Measures = ({ measures, half }) => {
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <List>
            {measures.map(measure => (
              <MeasureItem key={measure._id} measure={measure} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Measures
