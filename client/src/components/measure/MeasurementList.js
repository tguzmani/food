import { Box, Card, CardContent, List } from '@mui/material'
import React from 'react'
import MeasurementItem from './MeasureItem'
import { sortByDate } from '../../util/measure'

const MeasurementList = ({ measurements, half }) => {
  return (
    <Card>
      <CardContent>
        <List>
          {sortByDate(measurements, 'dec').map(measure => (
            <MeasurementItem key={measure._id} measure={measure} />
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default MeasurementList
