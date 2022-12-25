import React, { useState } from 'react'
// import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NavItem from './Navigation/NavItem'

import { Link, useLocation } from 'react-router-dom'
import { Box, Divider, MenuItem, Stack, styled } from '@mui/material'

// import useStyles from './Navigation/styles'
import Menu from './Menu'
import useMenu from '../../hooks/useMenu'
import useUser from 'hooks/useUser'
import { useStoreActions } from 'easy-peasy'
import useResponsive from '../../hooks/useResponsive'

import AppBar from './Navigation/AppBar'
import DesktopDrawer from './Navigation/DesktopDrawer'
import MobileDrawer from './Navigation/MobileDrawer'

import useTitle from 'hooks/useTitle'

const Nav = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: theme.mixins.drawer.width,
    flexShrink: 0,
  },
}))

const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}))

const Layout = ({ window, children }) => {
  const isMobile = useResponsive('md')
  const title = useTitle()
  const theme = useTheme()


  const [mobileOpen, setMobileOpen] = useState(false)

  const openDrawer = () => {
    setMobileOpen(true)
  }

  const closeDrawer = () => {
    setMobileOpen(false)
  }

  return (
    <Stack direction='row'>
      <AppBar title={title} openDrawer={openDrawer}/>

      <Nav>
        {isMobile ? (
          <MobileDrawer open={mobileOpen} onClose={closeDrawer} />
        ) : (
          <DesktopDrawer onClose={closeDrawer}/>
        )}
      </Nav>

      <Main>
        <Box sx={{...theme.mixins.toolbar}} />
        {children}
      </Main>
    </Stack>
  )
}

export default Layout
