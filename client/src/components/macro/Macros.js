import { Card, CardContent, LinearProgress } from '@material-ui/core'
import React from 'react'
import Calories from './Calories'

const Macros = () => {
  return (
    <Card>
      <CardContent>
        <Calories />
      </CardContent>
    </Card>
  )
}

export default Macros
