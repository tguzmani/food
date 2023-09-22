import React from 'react'

import { Box, Typography, List, Stack } from '@mui/material'
import NavItem from './NavItem'

import useNavigationItems from './use-navigation-items'

const Drawer = ({ onClose }) => {
  const routes = useNavigationItems()

  return (
    <Stack alignItems='center'>
      <Box mb={6}>
        <Typography variant="h6">Food</Typography>
      </Box>

      {routes.map(link => (
        <NavItem link={link} onClose={onClose} key={link.to} />
      ))}
    </Stack>
  )
}

export default Drawer
