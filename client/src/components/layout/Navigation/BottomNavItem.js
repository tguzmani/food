import { BottomNavigationAction } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BottomNavItem = ({ route }) => {
  return (
    <BottomNavigationAction
      LinkComponent={Link}
      to={route.to}
      sx={{ minWidth: 0 }}
      icon={<route.Icon />}
    />
  )
}

export default BottomNavItem
