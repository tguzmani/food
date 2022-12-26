import React from 'react'
import { Backdrop, CircularProgress, useTheme } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

const BackdropLoading = ({ open }) => {
  const theme = useTheme()

  return (
    <Backdrop
      open={open}
      sx={{ color: 'white', zIndex: theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackdropLoading
