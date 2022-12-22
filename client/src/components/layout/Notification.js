import React from 'react'
import { connect } from 'react-redux'

import { Snackbar } from '@mui/material'

import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notification = ({ authMessage }) => {
  const [open, setOpen] = React.useState(false)
  const [notification, setNotification] = React.useState({
    message: '',
    severity: '',
  })

  const { message, severity } = notification

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const showNotification = message => {
    setNotification(message)
    setOpen(true)
  }

  React.useEffect(() => {
    if (authMessage) showNotification(authMessage)
  }, [authMessage])

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  authMessage: state.auth.message,
})

export default connect(mapStateToProps, mapActionsToProps)(Notification)
