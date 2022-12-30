import React from 'react'
import { Stack, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'

const CompleteSetup = () => {
  return (
    <Stack alignItems='center'>
      <SettingsIcon
        sx={{ mb: 2, fontSize: 48, animation: 'rotation 15s infinite linear;' }}
      />
      <Typography variant='h6' align='center' gutterBottom>
        Let's setup your profile first
      </Typography>
      <Typography variant='body1' align='center'>
        Go to <Link to='/profile'>profile</Link> and setup your profile in order to
        use the app
      </Typography>
    </Stack>
  )
}

export default CompleteSetup
