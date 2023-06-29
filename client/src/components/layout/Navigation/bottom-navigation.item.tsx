import { BottomNavigationAction, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavigationItem } from './navigation.model'
import { useTranslation } from 'react-i18next'

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
      label={<Typography variant='caption' fontSize='9px'>{navigationItem.text}</Typography>}
      showLabel
    />
  )
}

export default BottomNavItem
