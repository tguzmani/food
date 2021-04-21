import MuiListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core'

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
