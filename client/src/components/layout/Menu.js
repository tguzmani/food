import {Menu as MuiMenu} from '@mui/material'
import React from 'react'

const Menu = ({ anchorEl, handleClose, children }) => {
  return (
    <MuiMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {children}
    </MuiMenu>
  )
}

export default Menu
