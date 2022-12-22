import React from 'react'

import HelpIcon from '@mui/icons-material/Help'
import CancelIcon from '@mui/icons-material/Cancel'

import { IconButton, Typography, Box } from '@mui/material'

const Detail = ({ title, children }) => {
  const [show, setShow] = React.useState(false)
  const Icon = show ? CancelIcon : HelpIcon

  return (
    <Box>
      <Box display='flex' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>{' '}
        {children && (
          <IconButton onClick={() => setShow(!show)} size="large">
            <Icon style={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {show && <Typography variant='body'>{children}</Typography>}
    </Box>
  );
}

export default Detail
