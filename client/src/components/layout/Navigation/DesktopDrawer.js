import React from 'react'

import { Drawer as MuiDrawer } from '@mui/material'
import Drawer from './Drawer'
import { useTheme } from '@emotion/react'

const DesktopDrawer = ({ onClose }) => {
  const theme = useTheme()

  return (
    <MuiDrawer
      variant='permanent'
      PaperProps={{ style: { backgroundColor: theme.palette.grey['950'] } }}
      open
    >
      <Drawer onClose={onClose} />
    </MuiDrawer>
  )
}

export default DesktopDrawer
