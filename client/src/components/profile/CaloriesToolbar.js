import React from 'react'

import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  AppBar as MuiAppBar,
  LinearProgress,
  Stack,
} from '@mui/material'

import { Link } from 'react-router-dom'

import useMenu from 'hooks/useMenu'

import Fade from '@mui/material/Fade'
import useIsDarkMode from 'hooks/useIsDarkMode'

const CaloriesToolbar = () => {
  const isDarkMode = useIsDarkMode()

  const { signOut } = useStoreActions(actions => actions.users)
  const { toggleCanDragFoods } = useStoreActions(actions => actions.foods)

  const state = useStoreState(state => state)

  const loadings = Object.keys(state).some(key => state[key].loading)

  return (
    <MuiAppBar
      position='fixed'
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        color: isDarkMode ? 'white' : 'inherit',
        top: '48px'
      }}
    >
      <Toolbar sx={{ minHeight: '40px !important' }}></Toolbar>
    </MuiAppBar>
  )
}

export default CaloriesToolbar
