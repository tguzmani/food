import { Divider, Menu, MenuItem } from '@material-ui/core'
import React from 'react'

const UserMenu = ({ anchorEl, handleClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  )
}

export default UserMenu
