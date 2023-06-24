import React from 'react'
import { Stack, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const NoMeasurements = () => {
  return (
    <Stack alignItems='center'>
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant='h6' align='center' gutterBottom>
        No measurements yet!
      </Typography>
      <Typography variant='body1' align='center'>
        Press the button below to add your first measurement
      </Typography>
    </Stack>
  )
}

export default NoMeasurements
