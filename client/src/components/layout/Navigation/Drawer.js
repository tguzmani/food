import React from 'react'

import { Box, Typography, List } from '@mui/material'
import NavItem from './NavItem'

import useNavigationItems from './use-navigation-items'

const Drawer = ({ onClose }) => {
  const routes = useNavigationItems()

  return (
    <>
      <Box ml={2} mt={1} mb={3}>
        <Typography variant='h5'>Food</Typography>
      </Box>

      <List>
        {routes.map(link => (
          <NavItem link={link} onClose={onClose} key={link.to} />
        ))}
      </List>
    </>
  )
}

export default Drawer
