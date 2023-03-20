import React from 'react'

import { Drawer as MuiDrawer } from '@mui/material'
import Drawer from './Drawer'
import { useTheme } from '@emotion/react'

const MobileDrawer = ({ open, onClose }) => {
  const theme = useTheme()

  return <MuiDrawer
    container={window ? () => window.document.body : undefined}
    variant='temporary'
    anchor='left'
    open={open}
    onClose={onClose}
    // classes={{
    //   paper: classes.drawerPaper,
    // }}
    PaperProps={{ style: { backgroundColor: theme.palette.grey['950'] } }}
    ModalProps={{
      keepMounted: true,
    }}
    // sx={{
    //   backgroundColor: 'primary.main',
    // }}
  >
    <Drawer onClose={onClose} />
  </MuiDrawer>
}

export default MobileDrawer