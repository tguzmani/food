import { Card, CardContent, LinearProgress } from '@material-ui/core'
import React from 'react'
import Calories from './Calories'
import Macro from './Macro'

const Macros = () => {
  return (
    <Card>
      <CardContent>
        <Calories />
        <Macro macro='protein' />
        <Macro macro='carbs' />
        <Macro macro='fat' />
      </CardContent>
    </Card>
  )
}

export default Macros
