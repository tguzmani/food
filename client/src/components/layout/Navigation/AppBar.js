import { useStoreActions, useStoreState } from 'easy-peasy'
import React from 'react'
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
import AppBarActions from './AppBarActions'

const AppBar = ({ title }) => {
  const isDarkMode = useIsDarkMode()

  const { signOut } = useStoreActions(actions => actions.users)
  const { toggleCanDragFoods } = useStoreActions(actions => actions.foods)

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

      <Stack
        component={Toolbar}
        sx={{ minHeight: '40px !important' }}
        direction='row'
        justifyContent='space-between'
      >
        <Typography variant='h6' sx={{ fontSize: 18 }}>
          {title}
        </Typography>

        <Stack direction='row' justifyContent='center' alignItems='center'>
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
      </Stack>
    </MuiAppBar>
  )
}

export default AppBar
