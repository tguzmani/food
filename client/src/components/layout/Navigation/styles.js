import { makeStyles } from '@material-ui/core'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  grow: {
    flexGrow: 1,
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    borderBottom: theme.palette.light.main,
    paddingTop: theme.spacing(1),
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.dark.main,
    color: theme.palette.light.main,
    padding: theme.spacing(2),
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  icon: {
    color: theme.palette.light.main,
    marginRight: theme.spacing(1),
  },
}))

export default useStyles
