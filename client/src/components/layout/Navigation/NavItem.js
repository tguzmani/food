import React from 'react'
import { ListItem as MuiListItem, ListItemIcon, ListItemText, styled } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const StyledNavItem = styled(MuiListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },

  button: {
    '&:hover': {
      backgroundColor: theme.palette.dark.light,
    },
  },
}))

const NavItem = ({ link, onClose }) => {
  const location = useLocation().pathname

  if (!link) return <div>'hola'</div>

  return (
    <StyledNavItem
      button
      selected={location.match(/\/[a-z]*/)[0] === link.to}
      key={link.text}
      component={Link}
      to={link.to}
      onClick={onClose}
    >
      <ListItemIcon sx={{ color: 'grey.100' }}>
        {link.icon}
      </ListItemIcon>
      <ListItemText primary={link.text} />
    </StyledNavItem>
  )
}

export default NavItem
