import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info'

const NoReferencesFoods = () => {
  return (
    <Stack alignItems='center'>
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant='h6' align='center' gutterBottom>
        No references yet!
      </Typography>
      <Typography variant='body1' align='center'>
        Go to <Link to='/references'>references</Link> and add your first
        reference before you can add foods
      </Typography>
    </Stack>
  )
}

export default NoReferencesFoods
