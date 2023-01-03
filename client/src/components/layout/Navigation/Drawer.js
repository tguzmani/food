import React from 'react'

import {
  Box,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import NavItem from './NavItem'

import TodayIcon from '@mui/icons-material/Today'
import AssessmentIcon from '@mui/icons-material/Assessment'
import InfoIcon from '@mui/icons-material/Info'
import TimelineIcon from '@mui/icons-material/Timeline'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import useUser from 'hooks/useUser'
import { useStoreState } from 'easy-peasy'

const Drawer = ({ onClose }) => {
  const theme = useTheme()
  const { userIsPremium, userIsAdmin } = useStoreState(state => state.users)

  let links = [
    { to: '/', text: 'Day', icon: <TodayIcon /> },
    { to: '/measurements', text: 'Measurements', icon: <AssessmentIcon /> },
    { to: '/references', text: 'References', icon: <InfoIcon /> },
    { to: '/profile', text: 'Profile', icon: <PersonIcon /> },
    {
      to: '/statistics',
      text: 'Statistics',
      icon: <TimelineIcon />,
      isPremium: true,
    },
    { to: '/users', text: 'Users', icon: <PeopleIcon />, isAdmin: true },
  ]

  if (!userIsPremium) links = links.filter(link => !link.isPremium)

  if (!userIsAdmin) links = links.filter(link => !link.isAdmin)

  return (
    <>
      <Box ml={2} mt={1} mb={3}>
        <Typography variant='h5'>Food</Typography>
      </Box>

      <List>
        {links.map(link => (
          <NavItem link={link} onClose={onClose} key={link.to} />
        ))}
      </List>
    </>
  )
}

export default Drawer
