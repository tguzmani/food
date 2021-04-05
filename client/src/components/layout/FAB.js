import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Zoom } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    left: theme.spacing(-3),
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    zIndex: 2,
  },

  fabIcon: {
    margin: theme.spacing(1),
  },

  fabFix: theme.mixins.toolbar,
}))

const FAB = ({ Icon, onClick, show }) => {
  const classes = useStyles()

  return (
    <div className={classes.fab}>
      <Zoom in={show}>
        <Fab color='primary' onClick={onClick}>
          <Icon className={classes.fabIcon} />
        </Fab>
      </Zoom>
    </div>
  )
}

export default FAB
