import React from 'react'
import { useStoreActions } from 'easy-peasy'

import {
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  AppBar as MuiAppBar,
} from '@mui/material'

import { Link } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

import useMenu from 'hooks/useMenu'
import useUser from 'hooks/useUser'
import useResponsive from 'hooks/useResponsive'

import { DRAWER_WIDTH } from '../../../constants/index'

const AppBar = ({ title, openDrawer }) => {
  const user = useUser()
  const isMobile = useResponsive('md')
  const { signOut } = useStoreActions(actions => actions.users)

  const handleLogout = () => {
    handleCloseMenu()
    signOut()
  }

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  return (
    <MuiAppBar position='fixed'>
      <Toolbar >
        {isMobile && (
          <IconButton
            sx={{ positin: 'relative', top: '1px' }}
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={openDrawer}
            // className={classes.menuButton}
            size='large'
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>{title}</Typography>

        <Typography>{user && user.name.split(' ')[0]}</Typography>
        <IconButton edge='end' color='inherit' onClick={handleOpenMenu}>
          <AccountCircle />
        </IconButton>
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
