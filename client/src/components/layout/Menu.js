import BaseMenu from '@material-ui/core/Menu'
import React from 'react'

const Menu = ({ anchorEl, handleClose, children }) => {
  return (
    <BaseMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {children}
    </BaseMenu>
  )
}

export default Menu
