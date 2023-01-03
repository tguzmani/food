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
} from '@mui/material'

import { Link, useLocation } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import OpenWithIcon from '@mui/icons-material/OpenWith'

import useMenu from 'hooks/useMenu'
import useUser from 'hooks/useUser'
import useResponsive from 'hooks/useResponsive'

import Fade from '@mui/material/Fade'

const AppBar = ({ title, openDrawer }) => {
  const user = useUser()
  const { pathname } = useLocation()

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
    <MuiAppBar position='fixed'>
      <Fade in={loadings}>
        <LinearProgress />
      </Fade>
      <Toolbar>
        {isMobile && (
          <IconButton
            sx={{ position: 'relative', top: '1px', paddingLeft: 0 }}
            color='inherit'
            onClick={openDrawer}
            edg='start'
            size='large'
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Stack
          direction='row'
          spacing={2}
          justifyContent='center'
          alignItems='center'
        >
          {pathname === '/' && (
            <>
              <IconButton
                id='dnd-toggle-button'
                edge='end'
                sx={{ color: canDragFoods ? 'primary.main' : 'inherit' }}
                onClick={handleToggleDrag}
              >
                <OpenWithIcon />
              </IconButton>

              <Divider orientation='vertical' flexItem />
            </>
          )}

          <Stack
            direction='row'
            spacing={0}
            justifyContent='center'
            alignItems='center'
          >
            <Typography>{user && user.name.split(' ')[0]}</Typography>
            <IconButton edge='end' color='inherit' onClick={handleOpenMenu}>
              <AccountCircle />
            </IconButton>
          </Stack>
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
