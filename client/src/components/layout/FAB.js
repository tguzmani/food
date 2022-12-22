import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { Fab, Tooltip, Zoom } from '@mui/material'

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

const FAB = ({ Icon, onClick, show, disabled, tooltipTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.fab}>
      <Zoom in={show}>
        <Tooltip placement='left' title={tooltipTitle} arrow>
          <Fab color='primary' onClick={onClick} disabled={disabled}>
            <Icon className={classes.fabIcon} />
          </Fab>
        </Tooltip>
      </Zoom>
    </div>
  )
}

export default FAB
