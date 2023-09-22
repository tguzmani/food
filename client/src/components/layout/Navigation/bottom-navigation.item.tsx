import { BottomNavigationAction, Box, Typography, alpha, useTheme } from '@mui/material'
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
  const theme = useTheme()

  const handleNavigateTo = () => {
    navigate(navigationItem.to)
  }

  const match = pathname?.match(/\/[a-z]*/)

  const isSelected = match && match[0] === navigationItem.to

  return (
    <BottomNavigationAction
      disableRipple
      sx={{ color: isSelected ? 'white' : 'grey.400' }}
      icon={
       
        <Box
          bgcolor={isSelected ? alpha(theme.palette.primary.main, 0.25) : 'transparent'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 56,
            height: 28,
            borderRadius: 8,
          }}
        >
          <navigationItem.Icon sx={{ fontSize: 18}} />
        </Box>
      }
      onClick={handleNavigateTo}
      label={
        <Typography variant="caption" fontSize="9px" fontWeight={isSelected ? 'bold' : 'normal'}>
          {navigationItem.text}
        </Typography>
      }
      showLabel
    />
  )
}

export default BottomNavItem
