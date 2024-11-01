import React, { useState } from 'react'
import { useTheme } from '@mui/material'

import { Stack, Box, styled } from '@mui/material'

import AppBar from './Navigation/AppBar'
import DesktopDrawer from './Navigation/DesktopDrawer'
import useResponsive from '../../hooks/useResponsive'

import useTitle from 'hooks/use-title'
import BottomNavigation from './Navigation/bottom-navigation'
import { useTranslation } from 'react-i18next'
import { BOTTOM_NAV_HEIGHT, DRAWER_WIDTH } from 'config/theme'

const Nav = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
}))

const Main = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'scroll',
  flexGrow: 1,
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh - ${BOTTOM_NAV_HEIGHT}px)`,
  },
}))

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useResponsive('md')
  const title = useTitle()
  const theme = useTheme()
  const { t } = useTranslation()

  // eslint-disable-next-line no-unused-vars
  const [_, setMobileOpen] = useState<boolean>(false)

  const closeDrawer = () => {
    setMobileOpen(false)
  }

  return (
    <>
      <Stack id="layout-stack" direction="row">
        <AppBar title={t(title)} />

        <Nav>{!isMobile && <DesktopDrawer onClose={closeDrawer} />}</Nav>

        <Main id="main">
          {children}
        </Main>
      </Stack>

      {isMobile && <BottomNavigation />}
    </>
  )
}

export default Layout
