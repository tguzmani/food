import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info'

const NoMeasurementsStats = () => {
  return (
    <Stack alignItems='center'>
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant='h6' align='center' gutterBottom>
        No measurements yet!
      </Typography>
      <Typography variant='body1' align='center'>
        Go to <Link to='measurements'>measurements</Link> and add your first measurement before you can see
        your statistics
      </Typography>
    </Stack>
  )
}

export default NoMeasurementsStats
