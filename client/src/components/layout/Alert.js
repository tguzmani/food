import { Alert as MuiAlert } from '@mui/material'
import React from 'react'

const Alert = ({ children }) => {
  return <MuiAlert severity='error'>{children}</MuiAlert>
}

export default Alert
