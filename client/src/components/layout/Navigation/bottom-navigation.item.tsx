import { BottomNavigationAction } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavigationItem } from './navigation.model'

interface BottomNavItemProps {
  navigationItem: NavigationItem
}

const BottomNavItem = ({ navigationItem }: BottomNavItemProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleNavigateTo = () => {
    navigate(navigationItem.to)
  }

  const match = pathname?.match(/\/[a-z]*/)

  const isSelected = match && match[0] === navigationItem.to

  return (
    <BottomNavigationAction
      sx={{
        minWidth: 0,
        color: isSelected ? 'primary.main' : 'text.secondary',
      }}
      icon={<navigationItem.Icon />}
      onClick={handleNavigateTo}
    />
  )
}

export default BottomNavItem
