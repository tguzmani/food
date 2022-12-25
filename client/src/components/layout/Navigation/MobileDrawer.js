import React from 'react'

import { Drawer as MuiDrawer } from '@mui/material'
import Drawer from './Drawer'

const MobileDrawer = ({ open, onClose }) => (
  <MuiDrawer
    container={window ? () => window.document.body : undefined}
    variant='temporary'
    anchor='left'
    open={open}
    onClose={onClose}
    // classes={{
    //   paper: classes.drawerPaper,
    // }}
    ModalProps={{
      keepMounted: true,
    }}
  >
    <Drawer onClose={onClose} />
  </MuiDrawer>
)

export default MobileDrawer