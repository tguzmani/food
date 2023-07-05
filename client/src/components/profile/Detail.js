import React from 'react'

import HelpIcon from '@mui/icons-material/Help'
import CancelIcon from '@mui/icons-material/Cancel'

import { IconButton, Typography, Box, Collapse } from '@mui/material'

const Detail = ({ title, children }) => {
  const [show, setShow] = React.useState(false)
  const Icon = show ? CancelIcon : HelpIcon

  return (
    <>
      <Box display='flex' alignItems='center'>
        <Typography variant='body1'>{title}</Typography>
        {children && (
          <IconButton onClick={() => setShow(!show)} size='large'>
            <Icon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      <Collapse in={show}>
        <Typography gutterBottom variant='body2'>{children}</Typography>
      </Collapse>
    </>
  )
}

export default Detail
