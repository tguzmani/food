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
import { Link, useLocation } from 'react-router-dom'

const Drawer = ({ onClose }) => {
  const location = useLocation().pathname
  const theme = useTheme()

  const links = [
    { to: '/', text: 'Day', icon: <TodayIcon /> },
    { to: '/measures', text: 'Measures', icon: <AssessmentIcon /> },
    { to: '/references', text: 'References', icon: <InfoIcon /> },
    { to: '/statistics', text: 'Statistics', icon: <TimelineIcon /> },
    { to: '/profile', text: 'Profile', icon: <PersonIcon /> },
  ]

  return (
    <>
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
            onClick={onClose}
          >
            <ListItemIcon sx={{color: theme.palette.grey[100]}}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </NavItem>
        ))}
      </List>
    </>
  )
}

export default Drawer
