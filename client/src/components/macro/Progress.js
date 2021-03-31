import { LinearProgress } from '@material-ui/core'
import React from 'react'

const Progress = ({ value }) => {
  return <LinearProgress variant='determinate' value={value} />
}

export default Progress
