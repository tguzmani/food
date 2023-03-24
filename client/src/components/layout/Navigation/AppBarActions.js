import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import {
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  AppBar as MuiAppBar,
  LinearProgress,
  Stack,
  Chip,
  useTheme,
  Collapse,
} from '@mui/material'

import { Link, useLocation } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import OpenWithIcon from '@mui/icons-material/OpenWith'

import useMenu from 'hooks/useMenu'
import useUser from 'hooks/useUser'
import useResponsive from 'hooks/useResponsive'

import Fade from '@mui/material/Fade'
import useIsDarkMode from 'hooks/useIsDarkMode'

const AppBarActions = ({ handleOpenMenu, handleToggleDrag }) => {
  const { user, userIsPremium } = useStoreState(state => state.users)
  const { pathname } = useLocation()
  const { canDragFoods } = useStoreState(state => state.foods)
  const isDarkMode = useIsDarkMode()

  const { updateUser } = useStoreActions(state => state.users)

  const handleToggleTheme = () => {
    updateUser({ themeMode: isDarkMode ? 'light' : 'dark' })
  }

  return (
    <>
      {/* Theme toggler */}
      <IconButton
        edge='end'
        sx={{ color: 'inherit' }}
        onClick={handleToggleTheme}
      >
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

      {/* Drag N Drop */}
      <Collapse
        orientation='horizontal'
        // mountOnEnter
        // unmountOnExit
        in={pathname === '/' && userIsPremium}
      >
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
