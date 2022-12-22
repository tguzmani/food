import MuiListItem from '@mui/material/ListItem'
import withStyles from '@mui/styles/withStyles';

const NavItem = withStyles(theme => ({
  root: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,

      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },

  button: {
    '&:hover': {
      backgroundColor: theme.palette.dark.light,
    },
  },
}))(MuiListItem)

export default NavItem
