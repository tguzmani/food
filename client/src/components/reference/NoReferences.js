import React from 'react'
import { Stack, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const NoReferences = () => {
  return (
    <Stack alignItems='center'>
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant='h6' align='center' gutterBottom>
        No references yet!
      </Typography>
      <Typography variant='body1' align='center'>
        Press the button below to add your a reference
      </Typography>
    </Stack>
  )
}

export default NoReferences
