import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const Message = ({Icon, title, children, sx}) => {
  return (
    <Stack alignItems='center' sx={sx}>
      <Icon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant='h6' align='center' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body1' align='center'>
        {children}
      </Typography>
    </Stack>
  )
}

export default Message
