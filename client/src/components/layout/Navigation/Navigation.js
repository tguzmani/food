import React from 'react'
import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import TodayIcon from '@mui/icons-material/Today'
import TimelineIcon from '@mui/icons-material/Timeline'
import AssessmentIcon from '@mui/icons-material/Assessment'
import InfoIcon from '@mui/icons-material/Info'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NavItem from './NavItem'
import PersonIcon from '@mui/icons-material/Person'

import { Link, useLocation } from 'react-router-dom'
import { Box, Divider, MenuItem } from '@mui/material'

import useStyles from './styles'
import Menu from '../Menu'
import useMenu from './../../../hooks/useMenu'
import useUser from 'hooks/useUser'
import { useStoreActions } from 'easy-peasy'
import useResponsive from '../../../hooks/useResponsive';

const Navigation = ({ window, children }) => {
  const location = useLocation().pathname
  const user = useUser()
  const isMobile = useResponsive('md')

  const { signOut } = useStoreActions(actions => actions.users)

  const [title, setTitle] = React.useState('Food')

  const titles = {
    '/': 'Day',
    '/measures': 'Measures',
    '/references': 'References',
    '/profile': 'Profile',
    '/statistics': 'Statistics',
  }

  React.useEffect(() => {
    const title = titles[location.match(/\/[a-z]*/)[0]]
    setTitle(title)
    document.title = `Food | ${title}`
    // eslint-disable-next-line
  }, [location])

  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleLogout = () => {
    handleCloseMenu()
    signOut()
  }

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const links = [
    { to: '/', text: 'Day', icon: <TodayIcon /> },
    { to: '/measures', text: 'Measures', icon: <AssessmentIcon /> },
    { to: '/references', text: 'References', icon: <InfoIcon /> },
    { to: '/statistics', text: 'Statistics', icon: <TimelineIcon /> },
    { to: '/profile', text: 'Profile', icon: <PersonIcon /> },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const closeDrawer = () => {
    setMobileOpen(false)
  }

  const applicationBar = (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
          size='large'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6'>
          {title}
        </Typography>
        <div className={classes.grow}></div>

        <Typography>{user && user.firstName}</Typography>
        <IconButton
          edge='end'
          color='inherit'
          onClick={handleOpenMenu}
          size='large'
        >
          <AccountCircle />
        </IconButton>

        <Menu anchorEl={anchorEl} handleClose={handleCloseMenu}>
          <MenuItem component={Link} to='/profile' onClick={handleCloseMenu}>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )

  const drawer = (
    <div>
      <Box ml={2} mt={1} mb={3}>
        <Typography variant='h5'>Food</Typography>
      </Box>

      <List>
        {links.map(link => (
          <NavItem
            button
            selected={location.match(/\/[a-z]*/)[0] === link.to}
            key={link.text}
            component={Link}
            to={link.to}
            onClick={closeDrawer}
          >
            <ListItemIcon className={classes.icon}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </NavItem>
        ))}
      </List>
    </div>
  )

  const mobileDrawer = (
    <Drawer
      container={window ? () => window().document.body : undefined}
      variant='temporary'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawer}
    </Drawer>
  )

  const desktopDrawer = (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant='permanent'
      open
    >
      {drawer}
    </Drawer>
  )

  return (
    <div className={classes.root}>
      {applicationBar}

      <nav className={classes.drawer}>
        {isMobile ? mobileDrawer : desktopDrawer}
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Navigation
