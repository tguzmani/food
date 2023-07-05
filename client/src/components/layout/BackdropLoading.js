import React from 'react'
import { Backdrop, CircularProgress, useTheme } from '@mui/material'

const BackdropLoading = ({ open }) => {
  const theme = useTheme()

  return (
    <Backdrop
      open={open}
      sx={{ color: 'white', zIndex: theme.zIndex.drawer + 1, bgcolor: '121212' }}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackdropLoading
