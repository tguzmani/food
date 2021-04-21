import React from 'react'

import HelpIcon from '@material-ui/icons/Help'
import CancelIcon from '@material-ui/icons/Cancel'

import { IconButton, Typography, Box } from '@material-ui/core'

const Detail = ({ title, children }) => {
  const [show, setShow] = React.useState(false)
  const Icon = show ? CancelIcon : HelpIcon

  return (
    <Box>
      <Box display='flex' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>{' '}
        {children && (
          <IconButton onClick={() => setShow(!show)}>
            <Icon style={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {show && <Typography variant='body'>{children}</Typography>}
    </Box>
  )
}

export default Detail
