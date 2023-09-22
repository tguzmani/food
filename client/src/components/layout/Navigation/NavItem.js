import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Stack,
  Box,
  Button,
  alpha,
  Typography,
} from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'

const StyledNavItem = styled(MuiListItem)(({ theme }) => ({
  borderRadius: theme.spacing(4),
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

  const isSelected = location.match(/\/[a-z]*/)[0] === link.to
  const theme = useTheme()
  const navigate = useNavigate()

  const handleNavigate = to => () => {
    navigate(to)
  }

  return (
    <Stack
      sx={{
        width: 64,
        height: 64,
        textTransform: 'none',
        color: 'grey.400',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          color: 'white',
          '& .MuiSvgIcon-root': {
            transform: 'scale(1.05)',
          }
        },
      }}
      mb={1}
      alignItems="center"
      onClick={handleNavigate(link.to)}
    >
      <Box
        bgcolor={isSelected ? alpha(theme.palette.primary.main, 0.25) : 'transparent'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={0.5}
        sx={{
          width: 56,
          minHeight: 32,
          borderRadius: 8,
        }}
      >
        <link.Icon sx={{ fontSize: 22 }} />
      </Box>

      <Typography variant="body2" fontSize="11px" fontWeight={isSelected ? 'bold' : 'normal'}>
        {link.text}
      </Typography>
    </Stack>
  )
}

export default NavItem
