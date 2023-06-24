import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import SettingsIcon from '@mui/icons-material/Settings'

import { IconButton, Collapse } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'

import OpenWithIcon from '@mui/icons-material/OpenWith'

import useIsDarkMode from 'hooks/useIsDarkMode'

const AppBarActions = ({ handleOpenMenu, handleToggleDrag }) => {
  const { userIsPremium } = useStoreState(state => state.users)
  const { pathname } = useLocation()
  const { canDragFoods } = useStoreState(state => state.foods)
  const isDarkMode = useIsDarkMode()

  const { updateUser } = useStoreActions(state => state.users)

  const handleToggleTheme = () => {
    updateUser({ themeMode: isDarkMode ? 'light' : 'dark' })
  }

  const navigate = useNavigate()

  const handleGoToSettings = () => {
    navigate('/settings')
  }

  return (
    <>
      {/* Theme toggler */}
      <IconButton
        edge='end'
        sx={{ color: 'inherit' }}
        onClick={handleGoToSettings}
      >
        <SettingsIcon />
      </IconButton>

      {/* Drag N Drop */}
      <Collapse orientation='horizontal' in={pathname === '/' && userIsPremium}>
        <IconButton
          id='dnd-toggle-button'
          edge='end'
          sx={{ color: canDragFoods ? 'primary.main' : 'inherit', ml: 1 }}
          onClick={handleToggleDrag}
        >
          <OpenWithIcon />
        </IconButton>
      </Collapse>
    </>
  )
}

export default AppBarActions
