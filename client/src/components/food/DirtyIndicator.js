import { Typography } from '@mui/material'
import React from 'react'

const DirtyIndicator = () => {
  return (
    <Typography variant='caption' color='error' sx={{ fontSize: '16px' }}>
      •
    </Typography>
  )
}

export default DirtyIndicator
