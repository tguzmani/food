import { ListItem as MuiListItem, styled } from '@mui/material'

import withStyles from '@mui/styles/withStyles'

const NavItem = styled(MuiListItem)(({ theme }) => ({
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

export default NavItem
