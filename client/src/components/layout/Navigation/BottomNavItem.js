import { BottomNavigationAction } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomNavItem = ({ route }) => {
  const { pathname } = useLocation()

  return (
    <BottomNavigationAction
      selected={pathname.match(/\/[a-z]*/)[0] === route.to}
      LinkComponent={Link}
      to={route.to}
      sx={{ minWidth: 0 }}
      icon={<route.Icon />}
    />
  )
}

export default BottomNavItem
