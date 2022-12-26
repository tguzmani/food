import React from 'react'
import { CircularProgress, Typography, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Stack
      sx={{ width: 1 }}
      spacing={2}
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress />
      {/* <Typography variant='h6'>Loading...</Typography> */}
    </Stack>
  )
}

export default Loading
