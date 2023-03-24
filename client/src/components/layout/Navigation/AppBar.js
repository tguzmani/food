import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

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
import AppBarActions from './AppBarActions'

const AppBar = ({ title, openDrawer }) => {
  const { user, userIsPremium } = useStoreState(state => state.users)
  const { pathname } = useLocation()
  const isDarkMode = useIsDarkMode()

  const isMobile = useResponsive('sm')
  const { signOut } = useStoreActions(actions => actions.users)
  const { toggleCanDragFoods } = useStoreActions(actions => actions.foods)

  const { canDragFoods } = useStoreState(state => state.foods)

  const state = useStoreState(state => state)

  const loadings = Object.keys(state).some(key => state[key].loading)

  const handleLogout = () => {
    handleCloseMenu()
    signOut()
  }

  const handleToggleDrag = () => {
    toggleCanDragFoods()
  }

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  return (
    <MuiAppBar
      position='fixed'
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        color: isDarkMode ? 'white' : 'inherit',
      }}
    >
      <Fade in={loadings}>
        <LinearProgress />
      </Fade>
      <Toolbar sx={{ minHeight: '40px !important' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, fontSize: 18 }}>
          {title}
        </Typography>

        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <AppBarActions
            handleOpenMenu={handleOpenMenu}
            handleToggleDrag={handleToggleDrag}
          />
        </Stack>

        <Menu
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorEl={anchorEl}
        >
          <MenuItem component={Link} to='/profile' onClick={handleCloseMenu}>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
