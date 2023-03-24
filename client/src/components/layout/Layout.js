import React, { useState } from 'react'
import { useTheme } from '@mui/material'

import { Stack, Box, styled } from '@mui/material'

import AppBar from './Navigation/AppBar'
import DesktopDrawer from './Navigation/DesktopDrawer'
import useResponsive from '../../hooks/useResponsive'

import useTitle from 'hooks/useTitle'
import BottomNavigation from './Navigation/BottomNavigation'

const Nav = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: theme.mixins.drawer.width,
    flexShrink: 0,
  },
}))

const Main = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
}))

const Layout = ({ window, children }) => {
  const isMobile = useResponsive('md')
  const title = useTitle()
  const theme = useTheme()

  const [_, setMobileOpen] = useState(false)

  const openDrawer = () => {
    setMobileOpen(true)
  }

  const closeDrawer = () => {
    setMobileOpen(false)
  }

  const mobileStackHeight = `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`

  return (
    <>
      <Stack
        direction='row'
        sx={{
          height: isMobile ? mobileStackHeight : '100%',
          overflowY: isMobile ? 'scroll' : 'hidden',
        }}
      >
        <AppBar title={title} openDrawer={openDrawer} />

        <Nav>{!isMobile && <DesktopDrawer onClose={closeDrawer} />}</Nav>

        <Main>
          <Box sx={{ ...theme.mixins.toolbar }} />

          {children}
        </Main>
      </Stack>
      {isMobile && <BottomNavigation />}
    </>
  )
}

export default Layout
