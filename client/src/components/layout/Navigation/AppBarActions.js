import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import SettingsIcon from '@mui/icons-material/Settings'

import {
  IconButton,
  Collapse,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import OpenWithIcon from '@mui/icons-material/OpenWith'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useMenu from 'hooks/useMenu'

const AppBarActions = ({ handleToggleDrag }) => {
  const { userIsPremium, user } = useStoreState(state => state.users)
  const { pathname } = useLocation()
  const { canDragFoods } = useStoreState(state => state.foods)
  const { signOut } = useStoreActions(actions => actions.users)

  const navigate = useNavigate()

  const handleGoToSettings = () => {
    navigate('/settings')
  }

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const handleLogout = () => {
    handleCloseMenu()
    signOut()
  }

  return (
    <>
      {/* Drag N Drop */}
      <Collapse orientation='horizontal' in={pathname === '/' && userIsPremium}>
        <IconButton
          id='dnd-toggle-button'
          sx={{ color: canDragFoods ? 'primary.main' : 'inherit' }}
          onClick={handleToggleDrag}
        >
          <OpenWithIcon />
        </IconButton>
      </Collapse>

      {pathname === '/profile' && (
        <IconButton
          edge='end'
          sx={{ color: 'inherit' }}
          onClick={handleGoToSettings}
        >
          <SettingsIcon />
        </IconButton>
      )}

      {pathname !== '/profile' && (
        <Stack direction='row' spacing={0.5} alignItems='center' mr={-1.5}>
          <Typography variant='body2'>{user?.firstName}</Typography>
          <IconButton
            edge='end'
            sx={{ color: 'inherit' }}
            onClick={handleOpenMenu}
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      )}

      <Menu
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
      >
        <MenuItem component={Link} to='/profile' onClick={handleCloseMenu}>
          Profile
        </MenuItem>

        <MenuItem component={Link} to='/settings' onClick={handleCloseMenu}>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default AppBarActions
