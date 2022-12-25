import React from 'react'

import { Drawer as MuiDrawer } from '@mui/material'
import Drawer from './Drawer'

const DesktopDrawer = ({ onClose }) => (
  <MuiDrawer
    variant='permanent'
    open
  >
    <Drawer onClose={onClose} />
  </MuiDrawer>
)

export default DesktopDrawer
