import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Stack
      sx={{ width: 1 }}
      spacing={2}
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress />
    </Stack>
  )
}

export default Loading
