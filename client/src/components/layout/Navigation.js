import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import HomeIcon from '@material-ui/icons/Home'
import TodayIcon from '@material-ui/icons/Today'
import AssessmentIcon from '@material-ui/icons/Assessment'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import InfoIcon from '@material-ui/icons/Info'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { Link } from 'react-router-dom'

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
    // boxShadow: '0 0px 10px 8px rgba(127, 127 ,127 , .4)',
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

const Navigation = props => {
  const { window, children } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const links = [
    { to: '/', text: 'Home', icon: <HomeIcon /> },
    { to: '/day', text: 'Day', icon: <TodayIcon /> },
    { to: '/measures', text: 'Measures', icon: <AssessmentIcon /> },
    { to: '/references', text: 'References', icon: <InfoIcon /> },
    {
      to: '/recipes',
      text: 'Recipes',
      icon: <MenuBookIcon />,
    },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const applicationBar = (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Food
        </Typography>
        <div className={classes.grow}></div>

        <IconButton
          edge='end'
          // onClick={handleProfileMenuOpen}
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {links.map((link, index) => (
          <ListItem button key={link.text} component={Link} to={link.to}>
            <ListItemIcon className={classes.icon}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const mobileDrawer = (
    <Drawer
      container={window ? () => window().document.body : undefined}
      variant='temporary'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawer}
    </Drawer>
  )

  const desktopDrawer = (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant='permanent'
      open
    >
      {drawer}
    </Drawer>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />

      {applicationBar}

      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          {mobileDrawer}
        </Hidden>
        <Hidden xsDown implementation='css'>
          {desktopDrawer}
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Navigation
